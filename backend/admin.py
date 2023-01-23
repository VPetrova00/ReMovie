from django.contrib import admin
from .models import User


# Register your models here.
class UserAdmin(admin.ModelAdmin):
    model = User
    ordering = ("username", "email")
    search_fields = ("username", "email")
    list_display = ("username", "email", "password")
    fields = ("username", "email", "password")


admin.site.register(User, UserAdmin)
