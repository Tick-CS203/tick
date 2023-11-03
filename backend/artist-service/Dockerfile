FROM python:3.9.18-slim

# pip freeze > requirements.txt
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY /templates .
COPY app.py .
COPY /pickle .

EXPOSE 5000

ENV FLASK_APP=app.py

CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]]