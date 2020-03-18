FROM python:3

WORKDIR /app/
RUN apt-get update && apt-get upgrade -y && apt-get autoremove && apt-get autoclean

COPY requirements.txt /app/
COPY weather /app/weather
COPY weather_app /app/weather_app
COPY manage.py /app/
COPY requirements.txt /app/
RUN pip install -r requirements.txt
