from rest_framework import serializers

from .models import CategoryTable, LinksTable

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=LinksTable
        fields=('title','link','category','description','owner')
        fields ='__all__'
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=CategoryTable
        fields ='__all__'