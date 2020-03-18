from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from datetime import datetime


@api_view(('GET',))
def points(request, graph_type='temperature'):
    start = request.GET.get('start').split('T')[0]
    end = request.GET.get('end').split('T')[0]
    show_past = request.GET.get('show_past')

    weather_all = WeatherValue.objects.all()
    weather = weather_all.filter(time__range=[start, end]) \
        .order_by('time').values('time', graph_type)
    values = {
        'name': graph_type.capitalize(),
        'x': [w['time'].strftime('%d/%m/%Y') for w in weather],
        'y': [w[graph_type] for w in weather],
        'dimension': WeatherValue.dimension(graph_type)
    }
    if show_past:
        past_weather = weather_all \
            .filter(time__in=[datetime(year=w['time'].year-1,
                                       month=w['time'].month,
                                       day=w['time'].day) for w in weather]) \
            .order_by('time').values(graph_type)
        values['past_weather'] = [[i, w[graph_type]] for i, w in enumerate(past_weather)]
    return Response(values)
