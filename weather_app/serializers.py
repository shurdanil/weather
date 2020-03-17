from rest_framework import serializers
from .models import WeatherValue


class CustomSerializer(serializers.ModelSerializer):

    class Meta:
        model = WeatherValue
        fields = ('pk', 'humidity', 'pressure', 'temperature', 'time')
