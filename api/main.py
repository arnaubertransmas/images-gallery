import os
# mòdul per crear requests del client i enviar-ho a un altre server(UNSPLASH) | per fer peticions a altres APIs
import requests
from flask import Flask, request
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY= os.environ.get("UNSPLASH_KEY", "")

# obliguem a l'user tenir una clau d'UNSPLASH
if not UNSPLASH_KEY:
    raise EnvironmentError("Crea .env.local fitxer i posa allà la clau de l'API d'UNSPLASH")

app = Flask(__name__)

@app.route("/new-image")
def new_image():
    # request per obtenir acces a la request del client | és enviat a Flask des del client
    word = request.args.get("query") # accedim a paràmetre query de la URL
    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY,
    }
    params = {
        # query parameters for the request 
        "query": word 
    }
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    
    data = response.json()
    return data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)