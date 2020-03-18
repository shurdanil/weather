from django.contrib import admin
from .models import WeatherValue


class WeatherValueAdmin(admin.ModelAdmin):
    list_display = ['humidity', 'pressure', 'temperature', 'time']


admin.site.register(WeatherValue)
