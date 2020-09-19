import os
import glob
import argparse
from collections import namedtuple
from pydub import AudioSegment
from models.deepspeech import deepspeech
from models.silero import silero


class Struct:
    def __init__(self, **entries):
        self.__dict__.update(entries)


class Transcribe_Model:
    list_of_models=["deepspeech","silero"]
    path_to_models="models"
    path_to_data="data"
    def __init__(self, args):
        if(args.t_model==self.list_of_models[0]):
            self.init_deepspeech(args)
        if(args.t_model==self.list_of_models[1]):
            self.init_silero(args)

    def init_deepspeech(self,args):
        default_model_file="deepspeech-0.8.1-models.pbmm"
        default_scorer_file="deepspeech-0.8.1-models.scorer"
        if args.model_file is None:
            args.model_file=default_model_file
        if args.scorer_file is None:
            args.scorer_file=default_scorer_file
        args.model=os.path.join(self.path_to_models, args.t_model, self.path_to_data, args.model_file)
        args.scorer=os.path.join(self.path_to_models, args.t_model, self.path_to_data, args.scorer_file)
        self.args=args

    def init_silero(self,args):
        default_language="English"
        if args.language is None:
            args.language=default_language
        self.args=args

    def run(self):
        if(self.args.t_model==self.list_of_models[0]):
            return(self.deepspeech_result())
        if(self.args.t_model==self.list_of_models[1]):
            return(self.silero_result())

    def deepspeech_result(self):
        result1,result2,result3=deepspeech.main(self.args)
        return(result1)
    
    def silero_result(self):
        result=silero.main(self.args)
        return(result)


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


def parse_args():
    """ Parse and return dictionary of the arguments """
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--audio", required=True,
                    help="the path to input audio or stream")
    ap.add_argument("-t", "--t_model", default="silero",
                    help="model for transcribing")
    ap.add_argument("-tf", "--t_model_file",
                    help="specific name of weight file")
    ap.add_argument("-ts", "--t_scorer_file",
                    help="specific name of scorer file")
    ap.add_argument("-ln", "--language", default="English",
                    help="language")
    ap.add_argument("-d", "--d_model", default="kaldi",
                    help="model for diagization")
    ap.add_argument("-s", "--sec", type=int, default=None,
                    help="maximum number of the seconds to process")
    args = ap.parse_args()
    return args


def main():
    args = parse_args()
    args.audio=convert_to_wav(args.audio)
    cut(args.sec, args.audio)
    args_for_t_model={'audio': args.audio,
                      'language': args.language,
                      't_model': args.t_model,
                      'model_file': args.t_model_file,
                      'scorer_file': args.t_scorer_file}
    args_for_t_model = Struct(**args_for_t_model)
    t_model=Transcribe_Model(args_for_t_model)
    result=t_model.run()
    print(result)

main()