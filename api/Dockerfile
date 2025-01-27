FROM python:latest

# carpeta on hi haurà tots els fitxers de l'aa
WORKDIR /app

EXPOSE 5050

# copiar-lo al /app
COPY  Pipfile ./
COPY Pipfile.lock ./

RUN pip install pipenv
RUN pipenv requirements > requirements.txt
# instal·larà els [packages] del Pipfile automàticament
RUN pip install -r requirements.txt

# copiem els altres fitxers com ara main.py
COPY . ./

CMD ["python", "main.py"]