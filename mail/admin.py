from django.contrib import admin
from .models import Email, User

class EmailAdmin(admin.ModelAdmin):
    model = Email
    list_display = ['subject', 'timestamp', 'sender']

admin.site.register(User)
admin.site.register(Email, EmailAdmin)