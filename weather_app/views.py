from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from datetime import datetime
from django.utils import timezone


@api_view(('GET',))
def points(request, graph_type='temperature'):
    start = request.GET.get('start')
    end = request.GET.get('end')

    if end:
        end = end.split('T')[0]
    else:
        end = timezone.now()

    if start:
        start = start.split('T')[0]
    else:
        start = datetime(year=1900, month=1, day=1)

    show_past = request.GET.get('show_past')

    weather = WeatherValue.objects.all().filter(time__range=[start, end]) \
        .order_by('time').values('time', graph_type)
    values = {
        'name': graph_type.capitalize(),
        'x': [w['time'].strftime('%d/%m/%Y') for w in weather],
        'y': [w[graph_type] for w in weather],
        'dimension': WeatherValue.dimension(graph_type)
    }
    if show_past:
        values['past_weather'] = []
        for w in range(len(weather)):
            try:
                w_time = weather[w]['time']
                past_point = WeatherValue.objects.get(
                    time=datetime(year=w_time.year-1,
                                  month=w_time.month,
                                  day=w_time.day))
                values['past_weather'].append([w, getattr(past_point, graph_type)])
            except WeatherValue.DoesNotExist:
                pass
    return Response(values)
