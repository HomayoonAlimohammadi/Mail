from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass


class Email(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='emails')
    subject = models.CharField(max_length=220)
    recipients = models.ManyToManyField(User, related_name='emails_recieved')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='emails_sent')
    content = models.TextField()
    timestamp = models.DateField(auto_now_add = True)
    is_archived = models.BooleanField(default=False)
    is_read = models.BooleanField(default=False)

    def serialize(self):
        context = {
            'id': self.id,
            'subject': self.subject,
            'recipients': self.recipients,
            'sender': self.sender,
            'content': self.content,
            'timestamp': self.timestamp,
            'archived': self.is_archived,
            'read': self.is_read,
        }
        return context


