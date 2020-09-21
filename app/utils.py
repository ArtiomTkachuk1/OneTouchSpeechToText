import os
from pydub import AudioSegment
import youtube_dl
import json

class Struct:
    def __init__(self, **entries):
        self.__dict__.update(entries)

def download_audio(link,upload_folder):
    SAVE_PATH = '/'.join(os.getcwd().split('/')[:3]) + '/' + upload_folder
    print(SAVE_PATH)
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
        'outtmpl':SAVE_PATH + '/%(title)s.%(ext)s',
    }
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([link])

def cut(sec,audio_name):
    if sec is not None:
        sound = AudioSegment.from_file(audio_name)
        sound.duration_seconds == (len(sound) / 1000.0)
        if sound.duration_seconds > sec:
            startTime = 0
            endTime = sec*1000
            extract = sound[startTime:endTime]
            extract.export(audio_name, format="wav")

def convert_to_wav(path_to_media):
    audio_path, audio_extension = os.path.splitext(path_to_media)
    if(audio_extension!=".wav"):
        extension_list = ('.aac', '.ac3','.aiff','.flac','.m4a','.mp3','.mp4','.ogg','.opus','.ts','.wma')
        if audio_extension in extension_list:
            wav_file_path = audio_path +'.wav'
            AudioSegment.from_file(path_to_media).export(wav_file_path, format='wav')
    return(audio_path+".wav")

def load_args(path_to_args):
    with open(path_to_args) as json_file:
        data = json.load(json_file)
        x=data['t_model'].split("/")
        data['t_model']=x[0]
        if(len(x)>1):
            if(x[1]=="en"):
                data['language']="English"
            if(x[1]=="de"):
                data['language']="German"
            if(x[1]=="es"):
                data['language']="Spanish"
        else:
            data['language']=None
        data['sec']=None
        data['t_model_file']=None
        data['t_scorer_file']=None
        data = Struct(**data)
        return data

def set_to_silero(audio_name):
    sound = AudioSegment.from_file(audio_name)
    sound = sound.set_channels(1)
    sound.export(audio_name, format="wav")

def concat_and_save(path,name,path_to_audio,data):
    print(path_to_audio)
    audio={"audio":path_to_audio}
    data.update(audio)
    settings_path=os.path.join(path,name);
    with open(settings_path, 'w') as json_file:
        json.dump(data, json_file);