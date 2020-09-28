# Installation guide
## 1. apt packages  
sudo apt-get install ffmpeg -y  
sudo apt-get install sox -y  
sudo apt-get install libsox-fmt-mp3 -y  
sudo apt install build-essential -y 
sudo apt-get install python3-dev  -y
## 2. Clone this repo  
git clone https://github.com/ArtiomTkachuk1/OneTouchSpeechToText.git  
## 3. Python packages
cd /OneTouchSpeechToText  
virtualenv -p /usr/bin/python3 venv  
source venv/bin/activate  
pip3 install -r requirements.txt 
### Without gpu:  
pip3 install -r requirements-no-gpu.txt  
### With gpu  
pip3 install -r requirements-gpu.txt  
## 4. Download weight files
https://drive.google.com/drive/folders/1EpGtplkUwXRL8ggis6WPTYXA0xRpEUxz?usp=sharing
### Paste folders content to OneTouchSpeechToText/app  
## 5. Test
sudo python3 server.py
