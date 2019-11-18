from django.db import models

class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

class StockChart(models.Model):
	symbol = models.CharField(max_length=100)
	theme = models.CharField(max_length=100)
	locale = models.CharField(max_length=100)