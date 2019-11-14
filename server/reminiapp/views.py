from django.shortcuts import render
from rest_framework import generics
from reminiapp.models import Lead
from reminiapp.serializers import LeadSerializer

class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer