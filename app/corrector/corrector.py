from spellchecker import SpellChecker
from punctuator import Punctuator
import os

def correct(begin_of_path,text,language="English"):
    #text is currently raw string
    words=text.split(" ")
    correct_words=[]
    spell = SpellChecker()
    for word in words:
        correct_words.append(spell.correction(word))
    separator = ' '
    correct_text=separator.join(correct_words)
    path_to_model=os.path.join(begin_of_path,"data","Demo-Europarl-EN.pcl")
    p = Punctuator(path_to_model)
    correct_text_with_punct=p.punctuate(correct_text)
    return(correct_text_with_punct)