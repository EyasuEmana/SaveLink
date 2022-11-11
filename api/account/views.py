from rest_framework import viewsets
from .serializers import UserCreateSerializer
from .models import UserAccount    
from rest_framework.decorators import api_view
from rest_framework.response import Response
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all().order_by('username')
#     serializer_class = UserCreateSerializer

@api_view(['POST','GET'])
def UserViewSet(request):
	serializer = UserCreateSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)
