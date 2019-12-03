# REFERENCE: https://www.valentinog.com/blog/drf/

from rest_framework import serializers
from reminiapp.models import *

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('id', 'name', 'email', 'message')

class StockChartSerializer(serializers.ModelSerializer):
	class Meta:
		model = StockChart
		fields = ('id', 'symbol', 'theme', 'locale')

# # ALTERNATIVE 
# class LeadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Lead
#         fields = '__all__'