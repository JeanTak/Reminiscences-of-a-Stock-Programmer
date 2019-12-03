from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from reminiapp.models import *
from reminiapp.serializers import *

class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

class StockChartCreate(generics.ListCreateAPIView):
    queryset = StockChart.objects.all()
    serializer_class = StockChartSerializer

@api_view(['POST'])
def StockChartUpdate(request):

	chartList = []
	for data in request.data:
		serializer = StockChartSerializer(data=data)

		if not serializer.is_valid():
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

		chartList.append(serializer)

	StockChart.objects.all().delete()
	
	for serializer in chartList:
			serializer.save()

	return Response(serializer.data, status=status.HTTP_201_CREATED)