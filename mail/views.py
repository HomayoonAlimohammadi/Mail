import json
from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import JsonResponse, Http404
from .forms import ComposeForm, LoginForm, RegisterForm
from .models import Email, User
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.contrib.auth import logout, authenticate, login
from django.contrib import messages
from django.shortcuts import get_object_or_404




def index_view(request):
    compose_form = ComposeForm()
    login_form = LoginForm()
    register_form = RegisterForm()
    context = {
        'compose_form': compose_form,
        'login_form': login_form,
        'register_form': register_form,
    }
    return render(request, 'mail/index.html', context)




# API Views

# @login_required(login_url=reverse('mail:login'))
def mailbox(request, mailbox):
    print('mailbox is wanted')
    if not request.user.is_authenticated:
        return JsonResponse(
            {'error': 'You must log in first'}, status=401, safe=False
        )

    if request.method != 'GET':
        context = {
            'error': 'Request must be GET' 
        }
        status = 400
        return JsonResponse(context, status)
    
    user = request.user
    if mailbox == 'inbox':
        emails = Email.objects.filter(
            user = user,
            is_archived=False,
        ).exclude(
            sender = user
        )

    elif mailbox == 'sent':
        emails = Email.objects.filter(
            user= user,
            sender=user, 
            is_archived=False,
        )
    
    elif mailbox == 'archived':
        emails = Email.objects.filter(
            is_archived = True,
            user= user,
        )
    else:
        return JsonResponse({"error": "Invalid mailbox."}, status=400)

    emails = [email.serialize() for email in emails.order_by('-timestamp').all()]
    return JsonResponse(emails, safe=False)
    # return JsonResponse(context, safe=False)




# this should be deleted
def compose_view(request):
    if not request.user.is_authenticated:
        return redirect(reverse('mail:login'))
    form = ComposeForm(request.POST or None)
    context = {
        'form': form,
    }
    if request.method == 'POST':
        if form.is_valid():
            subject = form.cleaned_data['subject']
            if subject is None:
                messages.error(request, 'Subject can not be empty.')
                return redirect(reverse('mail:compose_view'))
            content = form.cleaned_data['content']
            emails = [email.strip() for email in form.cleaned_data['recipients'].split(',')]
            if not emails:
                messages.error(request, 'Recipients can not be empty.')
                return redirect(reverse('mail:compose_view'))

            recipients = []
            for email in emails:
                try:
                    user = User.objects.get(
                        email=email
                    )
                    if user == request.user:
                        messages.error(request, 'Can not put your own email in recipients.')
                        return redirect(reverse('mail:compose_view'))
                except User.DoesNotExist:
                    messages.error(request, 'Invalid emails in recipients.')
                    return redirect(reverse('mail:compose_view'))

                recipients.append(user)
            
            users = set()
            users.add(request.user)
            users.update(recipients)
            for user in users:
                email = Email(
                    subject = subject,
                    content = content,
                    user = user,
                    sender = request.user,  
                    is_read = request.user == user  
                )    
                email.save()
                for recipient in recipients:
                    email.recipients.add(recipient)
                email.save()
            
            messages.success(request, 'Mail has been sent successfully.')
            return redirect(reverse('mail:mailbox', args=['inbox']))
    return render(request, 'mail/compose.html', context)




# @login_required(login_url=reverse('mail:login'))
def compose(request):
    if not request.user.is_authenticated:
        return JsonResponse(
            {'error': 'You need to Login first.'},
            status=401
        )
    if request.method == 'POST':
        form = ComposeForm(request.POST)
        if form.is_valid():
            subject = form.cleaned_data['subject']
            if subject is None:
                return JsonResponse(
                    {'error': 'Subject can not be empty!'},
                    status=402
                )
            content = form.cleaned_data['content']
            emails = [email.strip() for email in form.cleaned_data['recipients'].split(',')]
            if not emails:
                return JsonResponse(
                        {'error': 'Recipients can not be None.'},
                        status=402,
                    )

            recipients = []
            for email in emails:
                try:
                    user = User.objects.get(
                        email=email
                    )
                    if user == request.user:
                        return JsonResponse(
                        {'error': 'Cant send message to self!'},
                        status=402,
                        )
                except User.DoesNotExist:
                    return JsonResponse(
                        {'error': 'Invalid email amongst recipients.'},
                        status=402,
                    )
                recipients.append(user)
            
            users = set()
            users.add(request.user)
            users.update(recipients)
            for user in users:
                email = Email(
                    subject = subject,
                    content = content,
                    user = user,
                    sender = request.user,  
                    is_read = request.user == user  
                )    
                email.save()
                for recipient in recipients:
                    email.recipients.add(recipient)
                email.save()
            
            return JsonResponse(
                {'success': 'Email has been sent successfully.'},
                status=200,
            )
    return JsonResponse(
        {'success': 'User can proceed'},
        status=200
    )
    

def login_view(request):
    if request.user.is_authenticated:
        return redirect(reverse('mail:index'))
    form = LoginForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            print(user)
            if user:
                messages.success(request, f'Logged in as {username}')
                login(request, user)
                return redirect(reverse('mail:index'))
            else:
                messages.error(request, 'Invalid Username or Password')

    context = {
        'form': form
    }
    return render(request, 'mail/login.html', context=context)


def register_view(request):
    form = RegisterForm(request.POST or None)
    if request.method == 'POST':   
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            confirmation = form.cleaned_data['confirmation']
            if password != confirmation:
                messages.error(request, 'Password does not match.')
                return redirect(reverse('mail:register'))
            username = email.split('@')[0]
            user = User.objects.create_user(
                username = username,
                email = email,
                password = password,
            )
            user.save()
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, 'Email was created successfully.')
            return redirect(reverse('mail:index'))
    context = {
        'form': form
    }
    return render(request, 'mail/register.html', context=context)

# @login_required(login_url=reverse('mail:login'))
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect(reverse('mail:index'))
    
    return render(request, 'mail/logout.html')


def email_view(request, id):
    email = get_object_or_404(Email, id=id)
    context = {
        'email': email
    }        
    return render(request, 'mail/email.html', context)


def email(request, id):
    email = get_object_or_404(Email, id=id) 
    if request.method == 'PUT':
        # email.is_read = True
        # email.save()
        body = json.loads(str(request.body, 'utf-8'))
        if body.get('read') is not None:
            email.is_read = body['read']
        if body.get('archived') is not None:
            email.is_archived = body['archived']
        email.save()
        return JsonResponse(
            {'message': 'Email was marked as Read'},
            status=201
        )
    elif request.method == 'GET':
        email = email.serialize()       
        return JsonResponse(
            {'email': email},
            status=200,
        )


def delete_email_view(request, id):
    email = get_object_or_404(Email, id=id)
    context = {
        'email': email,
    }
    if request.method == 'POST':
        email.delete()
        messages.success(request, 'Email was deleted successfully.')
        return redirect(reverse('mail:index'))
    
    return render(request, 'mail/delete.html', context)
    

def toggle_archive_email_view(request, id):
    email = get_object_or_404(Email, id=id)
    if email.is_archived == True:
        messages.info(request, 'Email was Unarchived')
        email.is_archived = False
        email.save()
    else:
        messages.info(request, 'Email was Archived')
        email.is_archived = True
        email.save()
    return redirect(reverse('mail:email', args=[id]))


def loginAPI(request):

    # This section should not be needed
    # due to the "display: none" in layout
    # in case a user is signed in.
    if request.user.is_authenticated:
        return JsonResponse(
            {'message': 'Logged in successfully'},
            status = 200
        )
    if request.method == 'POST':
        credentials = json.loads(str(request.body, 'utf-8'))
        username = credentials.get('username')
        password = credentials.get('password')
        user = authenticate(username=username, password=password)
        print(user)
        if user:
            login(request, user)
            return JsonResponse(
                {'message': 'Logged in successfully'},
                status = 200
            )
        else:
            return JsonResponse(
                {'error': 'Invalid Credentials.'},
                status = 401
            )
    print('end of login')


    
    



