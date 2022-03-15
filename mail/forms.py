from .models import Email, User
from django import forms

class RegisterForm(forms.Form):
    email = forms.CharField(max_length=100)
    password = forms.CharField(min_length=8, max_length=100, widget=forms.PasswordInput)
    confirmation = forms.CharField(min_length=8, max_length=100)

class ComposeForm(forms.ModelForm):
    class Meta:
        model = Email
        fields = ['subject', 'content']
    recipients = forms.CharField(max_length=1000)

class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(min_length=8, max_length=100, widget=forms.PasswordInput)


