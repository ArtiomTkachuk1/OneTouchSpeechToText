import torch
import os
import random
from glob import glob
from omegaconf import OmegaConf
from .utils import (init_jit_model, 
                   split_into_batches,
                   read_batch,
                   prepare_model_input)
import numpy as np
from scipy.io import wavfile


def main(args):
    models = OmegaConf.load(os.path.join(args.model_file,"silero","models.yml"))
    device = torch.device('cpu')
    if args.language == 'German':
        model, decoder = init_jit_model(models.stt_models.de.latest.jit, device=device)
    elif args.language == "Spanish":
        model, decoder = init_jit_model(models.stt_models.es.latest.jit, device=device)
    else:
        model, decoder = init_jit_model(models.stt_models.en.latest.jit, device=device)
    test_file = [args.audio]
    batches = split_into_batches(test_file, batch_size=10)
    input = prepare_model_input(read_batch(batches[0]),
                            device=device)
    output = model(input)
    return(decoder(output[0]))