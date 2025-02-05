import os
# mòdul per crear requests del client i enviar-ho a un altre server(UNSPLASH) | per fer peticions a altres APIs
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from mongo_client import mongo_client

# creació de db i collection
gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
# environ.get del dotenv_path

UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

# obliguem a l'user tenir una clau d'UNSPLASH
if not UNSPLASH_KEY:
    raise EnvironmentError("Crea .env.local fitxer i posa allà la clau de l'API d'UNSPLASH")

app = Flask(__name__)
CORS(app)

# auto-reload de Flask
app.config["DEBUG"] = DEBUG

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

@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        #* llegim totes les imgs
        images = images_collection.find({})

        # * jsonify per convertir [],{} a json, recorrem les imgs i ho retornem
        return jsonify([img for img in images])
    
    if request.method == "POST":        
        #* guardem les imgs
        # obtenim el document json per passar-lo a l'insert directament
        image = request.get_json(force=True)
        image['_id'] = image.get('id')

        result = images_collection.insert_one(image) # per evitar typeerror x ObjectID
        inserted_id = result.inserted_id # enviem únicament l'ID
        return {"inserted_id": inserted_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)