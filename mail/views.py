import json
from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import JsonResponse
from .forms import ComposeForm, LoginForm, RegisterForm
from .models import Email, User
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.contrib.auth import logout, authenticate, login
from django.contrib import messages



def index_view(request):
    return render(request, 'mail/index.html')

    # if request.user.is_authenticated:
    #     compose_form = ComposeForm()
    #     context = {
    #         'compose_form': compose_form,
    #     }
    #     return render(request, 'mail/index.html')
    # else:
    #     return redirect(reverse('mail:login'))



# # API Views

# # @login_required(login_url=reverse('mail:login'))
# def mailbox(request, mailbox):
#     if request.method != 'GET':
#         context = {
#             'error': 'Request must be GET' 
#         }
#         status = 400
#         return JsonResponse(context=context, status=status)
    
#     user = request.user
#     if mailbox == 'inbox':
#         emails = Email.objects.filter(
#             user = request.user,
#             recipients = user,
#             is_archived=False,
#         )

#     elif mailbox == 'sent':
#         emails = Email.objects.filter(
#             user= request.user,
#             sender=user, 
#             is_archived=False,
#         )
    
#     elif mailbox == 'archived':
#         emails = Email.objects.filter(
#             Q(sender=user) | Q(recipients=user), 
#             is_archived = True,
#             user= request.user,
#         )
#     else:
#         return JsonResponse(
#             {'error': 'Invalid Mailbox.'},
#             status=400,
#         )

#     emails = [email.serialize() for email in emails.order_by('-timestramp').all()]

#     context = {
#         'emails': emails
#     }
#     return render(request, 'mail/mailbox.html', context)
#     # return JsonResponse(context, safe=False)


# # @login_required(login_url=reverse('mail:login'))
# def compose(request):
#     if request.method != 'POST':
#         return JsonResponse(
#             {'error': 'Request must be POST'},
#             status=402,
#         )
    
#     data = json.load(request.body)
#     subject = data.get('subject')
#     if subject is None:
#         return JsonResponse(
#             {'error': 'Subject can not be empty.'},
#             status=402,
#             )
#     content = data.get('content')
#     emails = [email.strip() for email in data.get('recipients').split(',')]
#     if not emails:
#         return JsonResponse(
#             {'error': 'Recipients can not be empty.'},
#             status=402,
#             )

#     recipients = []
#     for email in emails:
#         try:
#             user = User.objects.get(
#                 email=email
#             )
#         except User.DoesNotExist:
#             return JsonResponse(
#                 {'error': 'Invalid recipients'},
#                 status=400,
#             )
#         recipients.append(user)
    
#     users = set()
#     users.add(request.user)
#     users.update(emails)
#     for user in users:
#         email = Email(
#             subject = subject,
#             content = content,
#             user = request.user,
#             sender = request.user,  
#             is_read = request.user == user  
#         )    
#         email.save()
#         for recipient in recipients:
#             email.recipients.add(recipient)
#         email.save()
    
#     messages.success(request, 'Mail has been sent successfully.')
#     return redirect(reverse('mail:index'))


# def login_view(request):
#     form = LoginForm(request.POST or None)
#     if request.method == 'POST':
#         if form.is_valid():
#             email = form.cleaned_data['username']
#             password = form.cleaned_data['password']
#             user = authenticate(request, username=email, password=password)
#             if user:
#                 messages.success(request, f'Logged in as {email}')
#                 login(request, user)
#                 return redirect(reverse('mail:index'))
#             else:
#                 messages.error(request, 'Invalid Username or Password')

#     context = {
#         'form': form
#     }
#     return render(request, 'mail/login.html', context=context)


# def register_view(request):
#     form = RegisterForm(request.POST or None)
#     if request.method == 'POST':   
#         if form.is_valid():
#             email = form.cleaned_data['email']
#             password = form.cleaned_data['passowrd']
#             confirmation = form.cleaned_data['confirmation']
#             if password != confirmation:
#                 messages.error(request, 'Password does not match.')
#                 return render(request, 'mail/register.html')
#             user = User.objects.create(
#                 username = email,
#                 password = password,
#             )
#             user.save()
#             messages.success(request, 'Email was created successfully.')
#             return redirect(reverse('mail:index'))
#     context = {
#         'form': form
#     }
#     return render(request, 'mail/register.html', context=context)

# @login_required(login_url=reverse('mail:login'))
# def logout_view(request):
#     logout(request.user)
    
#     return redirect(reverse('mail:index'))



