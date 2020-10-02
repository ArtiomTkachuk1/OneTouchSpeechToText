import json

#import pyaudio
import pydub
from vosk import Model, KaldiRecognizer

def audio_speech_recognition(model_path, audio_path):
    """
    Recognizes text from audio file

    :param model_path: str
    :return: None
    """

    # checking if file has .mp3 format and convert it to .wav
    result=""
    with open(audio_path, 'rb') as wf:
        model = Model(model_path)
        rec = KaldiRecognizer(model, 16000)

        wf.read(44)

        while True:
            data = wf.read(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                res = json.loads(rec.Result())
                #print(res,29)
                print(res['text'])
                result=result+res['text']

        '''res = json.loads(rec.FinalResult())
        print(rec.FinalResult(),33)
        print(rec.Result(),34)
        print(res['text'],35)'''
        print(result)
        return result

def main(args):
    model_path=os.path.join(args.path_to_models,"vosk","data",args.language)
    text=audio_speech_recognition(model_path,args.audio)
    return text