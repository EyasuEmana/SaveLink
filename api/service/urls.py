from django.urls import path, include
from . import views
urlpatterns = [
    path('data/',views.DataViewSet),
    path('get-links/', views.linkList, name="get-links"),
    path('link-delete/<str:pk>/',views.linkDelete, name="link-delete"),
    path('link-detail/<str:pk>/', views.linkDetail, name="link-detail"),
    path('link-update/<str:pk>/', views.linkUpdate, name="link-update"),
    path('add-link/', views.listCreate, name="add-link"),
    path('add-category/', views.catetoryCreate, name="add-category"),
    path('get-categories/', views.categoryList, name="get-categories"),
    path('category-delete',views.categoryDelete, name="category-delete"),
    path('get-catlinks/',views.catLinkFetch,name="get-catlinks")
]