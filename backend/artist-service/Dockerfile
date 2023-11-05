FROM python:3.9.18-slim

# pip freeze > requirements.txt
WORKDIR /app

COPY requirements.txt /app
RUN pip install -r requirements.txt

COPY templates /app/templates
COPY app.py /app
COPY pickle /app/pickle

EXPOSE 5000

ENV FLASK_APP=app.py

CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]]