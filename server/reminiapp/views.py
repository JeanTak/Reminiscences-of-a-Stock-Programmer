from django.shortcuts import render
from rest_framework import generics
from reminiapp.models import *
from reminiapp.serializers import *

class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

class StockChartCreate(generics.ListCreateAPIView):
    queryset = StockChart.objects.all()
    serializer_class = StockChartSerializer

