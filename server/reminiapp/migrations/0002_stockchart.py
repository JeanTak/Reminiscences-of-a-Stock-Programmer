# Generated by Django 2.2.5 on 2019-11-16 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reminiapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='StockChart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symbol', models.CharField(max_length=100)),
                ('theme', models.CharField(max_length=100)),
                ('locale', models.CharField(max_length=100)),
            ],
        ),
    ]
