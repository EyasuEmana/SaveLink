from unicodedata import category
from django.db import models
import uuid
from django.db import models

from api.account.models import UserAccount
class CategoryTable(models.Model):
    category=models.CharField( max_length=200)
    created_at=models.DateTimeField( auto_now_add=True)
    owner=models.ForeignKey(UserAccount,on_delete=models.CASCADE,default=0)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category

class LinksTable(models.Model):
    primary_id=models.UUIDField(
         primary_key = True,
         default = uuid.uuid4,
         editable = False)
    title=models.CharField( max_length=150, null=True)
    link=models.CharField( max_length=1000, null=False)
    description=models.TextField(default="")
    category=models.ForeignKey(CategoryTable, on_delete=models.CASCADE, blank=True, null=True)
    owner=models.ForeignKey(UserAccount,on_delete=models.CASCADE)
    created_at=models.DateTimeField( auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
