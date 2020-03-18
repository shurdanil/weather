from django.db import models


class WeatherValue(models.Model):
    humidity = models.IntegerField(
        null=False,
        blank=False,
        verbose_name="Humidity"
    )

    pressure = models.IntegerField(
        null=False,
        blank=False,
        verbose_name="Pressure"
    )

    temperature = models.FloatField(
        null=False,
        blank=False,
        verbose_name="Temperature"
    )

    time = models.DateTimeField(
        null=False,
        blank=False,
        verbose_name="Registration time"
    )

    @staticmethod
    def dimension(graph_type):
        dimensions = {
            'humidity': '%',
            'pressure': 'mb',
            'temperature': '°C'
        }
        return dimensions.get(graph_type)
