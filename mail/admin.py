from django.contrib import admin
from .models import Email, User

class EmailAdmin(admin.ModelAdmin):
    model = Email
    list_display = ['id', 'subject', 'timestamp', 'sender']

class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ['id', 'username', 'email']

admin.site.register(User, UserAdmin)
admin.site.register(Email, EmailAdmin)