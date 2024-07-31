from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, Teaching, Channel, Category, Profile

class UserRegisterForm(UserCreationForm):
    is_teacher = forms.BooleanField(required=False, label="Are you a teacher?")

    class Meta:
        model = User
        fields = ['full_name','username', 'email', 'password1', 'password2', 'is_teacher']

class TeachingUploadForm(forms.ModelForm):
    class Meta:
        model = Teaching
        fields = ['title', 'description', 'channel', 'start_time', 'end_time', 'thumbnail', 'file', 'video']

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user')
        approved_channels = kwargs.pop('approved_channels')
        super().__init__(*args, **kwargs)
        self.fields['channel'].queryset = approved_channels

    

class ChannelRequestForm(forms.ModelForm):
    class Meta:
        model = Channel
        fields = ['name', 'description', 'category', 'profile_picture']
        widgets = {
            'category': forms.Select(),
        }


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['profile_image', 'full_name', 'phone', 'email']

