import os
import glob
from datetime import datetime
import argparse
from .utils import (cut,
                    convert_to_wav,
                    set_to_silero,
                    load_args,
                    fix_path,
                    monitor,
                    Struct)
from .t_models.deepspeech import deepspeech
from .t_models.silero import silero
frotm th_models.vosk import vosk
from .corrector.corrector import correct
'''class Struct:
    def __init__(self, **entries):
        self.__dict__.update(entries)'''


class Transcribe_Model:
    list_of_models=["DeepSpeech","Silero","Vosk"]
    path_to_models=fix_path("t_models")
    path_to_data="data"
    def __init__(self, args):
        if(args.t_model==self.list_of_models[0]):
            self.init_deepspeech(args)
        if(args.t_model==self.list_of_models[1]):
            self.init_silero(args)
        if(args.t_model==self.list_of_models[2]):
            self.init_vosk(args)

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
        if args.model_file is None:
            args.model_file=self.path_to_models
        self.args=args
    
    def init_vosk(self,args):
        default_language="English"
        if args.language is None:
            args.language=default_language
        if args.model_file is None:
            args.model_file=self.path_to_models
        self.args=args

    def run(self):
        if(self.args.t_model==self.list_of_models[0]):
            return(self.deepspeech_result())
        if(self.args.t_model==self.list_of_models[1]):
            return(self.silero_result())
        if(args.t_model==self.list_of_models[2]):
            return(self.vosk_result())

    def deepspeech_result(self):
        result1,result2,result3=deepspeech.main(self.args)
        return(result1)

    def silero_result(self):
        result=silero.main(self.args)
        return(result)

    def vosk_result(self):
        result=vosk.main(self.args)
        return(result)


def core(path_to_args):
    time=datetime.now()
    args=load_args(path_to_args)
    time=monitor("args loaded",time)
    args.audio=convert_to_wav(args.audio)
    cut(args.sec, args.audio)
    path_to_corrector=fix_path("corrector")
    time=monitor("Utils done",time)
    args_for_t_model={'audio': args.audio,
                      'language': args.Language,
                      't_model': args.Transcribe_model,
                      'model_file': args.t_model_file,
                      'scorer_file': args.t_scorer_file}
    args_for_t_model = Struct(**args_for_t_model)
    t_model=Transcribe_Model(args_for_t_model)
    time=monitor("Transcribe_Model loaded",time)
    raw_text=t_model.run()
    time=monitor("Transcribe_Model done",time)
    correct_text=correct(path_to_corrector,raw_text)
    time=monitor("Correction done",time)
    return(correct_text)
