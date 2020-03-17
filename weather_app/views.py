from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *


@api_view(('GET',))
def points(request):

    weather = WeatherValue.objects.all().values()
    print([w for w in weather])
    return Response({'data': weather})
