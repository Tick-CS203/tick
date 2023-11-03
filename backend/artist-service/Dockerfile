FROM python:3.9.18

# pip freeze > requirements.txt
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY /templates .
COPY app.py .
COPY /pickle .

ENV FLASK_APP=app.py

ENTRYPOINT ["python", "-m", "flask", "run"]