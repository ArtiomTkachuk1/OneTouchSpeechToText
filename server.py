import os;
import json;
import youtube_dl;
from app.core import core;
import time;
from flask import Flask, render_template, request, jsonify;
#from flask_cors import CORS, cross_origin;


def download_audio(link,upload_path):
    SAVE_PATH =upload_path
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
        'outtmpl':SAVE_PATH + '/%(title)s.%(ext)s',
    }
    title=""
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([link])
        info_dict = ydl.extract_info(link, download=False)
        title=info_dict.get("title",None)
    return title


def concat_and_save(path,name,path_to_audio,data):
    audio={"audio":path_to_audio}
    data.update(audio)
    settings_path=os.path.join(path,name);
    with open(settings_path, 'w') as json_file:
        json.dump(data, json_file);


template_folder=os.path.join("OneTouchSpeechToTextFrontend","build")
static_folder=os.path.join(template_folder,"static")
app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)

#cors = CORS(app, resources={r"/": {"origins": "http://localhost:5000"}})
app.config['CORS_HEADERS'] = 'Content-Type'

UPLOAD_FOLDER = os.path.join(app.root_path, 'upload')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
DATA_FOLDER = os.path.join(app.root_path, 'data')
app.config['DATA_FOLDER'] = DATA_FOLDER
settings_name="settings.json"


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/file_from_form', methods=['POST'])
def upload_file_from_form():
    file = request.files["media"];
    filename=file.filename;
    file_path=os.path.join(app.config['UPLOAD_FOLDER'],filename);
    file.save(file_path);
    settings = json.load(request.files['settings']);
    concat_and_save(app.config['DATA_FOLDER'], settings_name, file_path, settings);
    app.config['DATA_FOLDER']
    print("Data saved")
    return("OK");

@app.route('/file_from_ref', methods=['POST'])
def upload_file_from_ref():
    settings = request.json;
    media_name=download_audio(request.json["ref"],app.config['UPLOAD_FOLDER']);
    print(media_name)
    settings["audio"]=os.path.join(app.config['UPLOAD_FOLDER'],media_name+".wav");
    print(settings["audio"])
    concat_and_save(app.config['DATA_FOLDER'], settings_name, settings["audio"], settings);
    print("Data saved")
    return("OK");


@app.route('/get_transcribtion',methods=['GET'])
#@cross_origin()#origin='*',headers=['Access-Control-Allow-Origin'])
def return_data():
    settings_path=os.path.join(app.config['DATA_FOLDER'], settings_name);
    result=core(settings_path)
    result=jsonify(result)
    result.headers.add("Access-Control-Allow-Origin", "*")
    return(result)

print(app.url_map)
print('Starting Flask!')
if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')


'''
TO DO
1.secure post requests from injections,xss,etc

ALLOWED_EXTENSIONS = set(['avi', 'mp4'])
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

'''
