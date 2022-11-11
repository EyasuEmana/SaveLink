from rest_framework import viewsets
from .serializers import CategorySerializer
from .serializers import UserDataSerializer
from .models import LinksTable
from .models import CategoryTable   
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST','GET'])
def DataViewSet(request):
	serializer = UserDataSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['GET','POST'])  # DECORATOR
def linkList(request):
	print(request.data.get("uid"))
	tasks = LinksTable.objects.filter(owner=request.data.get("uid")).order_by('created_at')
	serializer = UserDataSerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['GET','POST'])  # DECORATOR
def categoryList(request):
	tasks = CategoryTable.objects.filter(owner=request.data.get("uid")).order_by('updated_at')
	serializer = CategorySerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['DELETE'])
def linkDelete(request, pk):
	print("deleting from server")
	link = LinksTable.objects.get(primary_id=pk)
	link.delete()

	return Response('Item succsesfully delete!')

@api_view(['POST'])
def linkUpdate(request, pk):
	task = LinksTable.objects.get(id=pk)
	serializer = UserDataSerializer(instance=task, data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['GET'])
def linkDetail(request, pk):
	tasks = LinksTable.objects.get(id=pk)
	serializer = UserDataSerializer(tasks, many=False)
	return Response(serializer.data)

@api_view(['POST','GET'])
def listCreate(request):
	# print(request.data)
	serializer = UserDataSerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	else:
		print(serializer.errors)
	return Response(serializer.data)
@api_view(['POST','GET'])
def catetoryCreate(request):
	print(request.data)
	serializer = CategorySerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
	else:
		print(serializer.errors)
	return Response(serializer.data)

@api_view(['DELETE'])
def categoryDelete(request, pk):
	category = CategoryTable.objects.get(id=pk)
	category.delete()

	return Response('Item succsesfully delete!')

@api_view(['POST'])
def catLinkFetch(request):
	catlinks=LinksTable.objects.filter(owner=request.data.get("uid"), category=request.data.get("category"))
	serializer = UserDataSerializer(catlinks, many=True)
	print(serializer.data)
	return Response(serializer.data)
