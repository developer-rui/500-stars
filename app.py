
import pandas as pd
import requests
from bs4 import BeautifulSoup
import json

from flask import Flask, url_for, render_template
#from flask_cors import CORS

app = Flask(__name__)
#CORS(app)


@app.route('/')
def mainpage():
    return render_template("index.html")

@app.route('/starmap')
def starmap():
    return render_template("starmap.html")

@app.route('/stars')
def get_stars():    
    return pd.read_csv("500stars.csv").to_json()
  
@app.route('/gst/')
def get_gst():
    x = requests.get('https://www.heavens-above.com/whattime.aspx').text
    s = BeautifulSoup(x, 'lxml')
    return s.find(id="gst").span.text

@app.route('/cities')
def get_cities():    
    return pd.read_csv("cities.csv").to_json()



def textual_ra_to_deg(ra):
    #print("---initial ra: " + ra)

    ra = ra.split(' ') 
    #print(ra)

    h = int(ra[0][-3:-1])
    m = int(ra[1][:2])
    s = int(ra[2][:2])  
    return 360 * (h / 24 + m / 24 / 60 + s / 24 / 3600)

def textual_dec_to_deg(dec):
    #print("---initial dec: " + dec)

    dec = dec.split(' ')
    #print(dec)

    deg = int(dec[0][-4:-1])
    sign = deg / abs(deg) if deg != 0 else 1
    arcmin = int(dec[1][:2]) * sign    
    return deg + arcmin / 60

@app.route('/solarsystem')
def solar_system():    
    x = requests.get('https://theskylive.com/planets').text
    s = BeautifulSoup(x, 'lxml')
    
    celestial_object_containers = s.find_all(class_ = "object_container")
    
    datas = dict()
    for container in celestial_object_containers:
        celestial_object = container.find('a').text
        if celestial_object != "Planet Nine (conjectured)":
            datas[celestial_object] = {
                "rasc" : textual_ra_to_deg(container.find('b', string='R.A').nextSibling),
                "dec" : textual_dec_to_deg(container.find('b', string='Dec').nextSibling),
                "mag" : float(container.find('b', string='Dec').nextSibling.nextSibling.nextSibling.split(" ")[1].split("\t")[0])                    
            }  
    
    return json.dumps(datas, indent = 4)


if __name__ == '__main__':
    app.run()
