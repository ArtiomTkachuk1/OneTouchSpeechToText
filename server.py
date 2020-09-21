import os;
import json;
from app.utils import (download_audio,
                         concat_and_save);
from app.main import main
import time;
from flask import Flask, render_template, request, redirect, url_for, request, send_file, Response,abort;
from flask_cors import CORS, cross_origin


template_folder=os.path.join("frontend","build")
static_folder=os.path.join(template_folder,"static")

app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)
#CORS(app, resources={r"/*"})

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
    print(request)
    print(request.files)
    file = request.files["media"];
    filename=file.filename;
    file_path=os.path.join(app.config['UPLOAD_FOLDER'],filename);
    file.save(file_path);
    settings = json.load(request.files['settings']);
    concat_and_save(app.config['DATA_FOLDER'], settings_name, file_path, settings);
    return("OK");

@app.route('/file_from_ref', methods=['POST'])
def upload_file_from_ref():
    settings = request.json;
    print(settings)
    download_audio(request.json["ref"],app.config['UPLOAD_FOLDER']);
    concat_and_save(app.config['DATA_FOLDER'], settings_name, request.json["ref"], settings);
    return("OK");


@app.route('/get_transcribtion',methods=['GET'])
def return_data():
    settings_path=os.path.join(app.config['DATA_FOLDER'], settings_name);
    result=main(settings_path)
    print(result)
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
