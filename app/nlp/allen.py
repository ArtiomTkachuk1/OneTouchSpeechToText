from allennlp.predictors.predictor import Predictor

def QA(text,question):
    path_to_model="/data/bidaf-elmo-model-2020.03.19"
    with open(path_to_text, 'r') as file:
        text = file.read().replace('\n', '')
    predictor = Predictor.from_path(path_to_model)
    result = predictor.predict(text,question)
    return result['best_span_str']

def information_extraction(text):
    path_to_model="/data/openie-model.2020.03.26"
    predictor = Predictor.from_path(path_to_model)
    result = predictor.predict(text)
    return result

def run(text):
    question="What did I do?"
    qa_result=QA(text,question)
    print(qa_result)
    ioe_result=information_extraction(text)
    for i in ioe_result:
        print(i)
    return qa_result

text="I installed everything wigh GPU usage. I wrote installation guide. I add vosk model. Frontend was reconfigured"