FROM python:3.6.0-alpine

WORKDIR /app/

RUN apk update \
    && apk add postgresql-dev gcc musl-dev

COPY requirements.txt /app/
COPY weather /app/weather
COPY weather_app /app/weather_app
COPY manage.py /app/
COPY requirements.txt /app/
RUN pip install -r requirements.txt
