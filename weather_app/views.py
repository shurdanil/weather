from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from datetime import timedelta
from django.utils import timezone


@api_view(('GET',))
def points(request, graph_type='temperature'):
    start = request.GET.get('start', timezone.now() - timedelta(days=7))
    end = request.GET.get('end', timezone.now())

    weather = WeatherValue.objects.all()\
        .filter(time__range=[start, end])\
        .order_by('time').values('time', graph_type)
    values = {
        'name': graph_type.capitalize(),
        'x': [w['time'].strftime('%d/%m/%Y %H:%M') for w in weather],
        'y': [w[graph_type] for w in weather],
        'dimension': WeatherValue.dimension(graph_type)
    }
    return Response(values)
