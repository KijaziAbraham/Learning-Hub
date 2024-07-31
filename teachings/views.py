from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from .forms import UserRegisterForm, TeachingUploadForm, ChannelRequestForm
from .models import Category, Teaching, Channel
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from .forms import ProfileForm
from .models import Profile
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            if form.cleaned_data['is_teacher']:
                user.is_teacher = True
                user.save()
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'registration/register.html', {'form': form})


@login_required
@user_passes_test(lambda u: u.is_teacher)
def upload_teaching(request):
    approved_channels = Channel.objects.filter(teacher=request.user, approved=True)
    if request.method == 'POST':
        form = TeachingUploadForm(request.POST, request.FILES, user=request.user, approved_channels=approved_channels)
        if form.is_valid():
            form.save()
            return redirect('teachings_list')
    else:
        form = TeachingUploadForm(user=request.user, approved_channels=approved_channels)
    return render(request, 'teachings/upload_teachings.html', {'form': form})

@login_required
def teachings_list(request):
    channels = Channel.objects.filter(approved=True)
    return render(request, 'teachings/teachings_list.html', {'channels': channels})

@login_required
@user_passes_test(lambda u: u.is_teacher)
def request_channel(request):
    if request.method == 'POST':
        form = ChannelRequestForm(request.POST)
        if form.is_valid():
            channel = form.save(commit=False)
            channel.teacher = request.user
            channel.approved = False   
            channel.save()
            return redirect('teachings_list')
    else:
        form = ChannelRequestForm()
    return render(request, 'teachings/request_channel.html', {'form': form})

 
@login_required
@user_passes_test(lambda u:u.is_staff or u.is_admin)
def approve_channel(request):
    if not request.user.is_staff :
        return redirect('teachings_list')
    if request.method == 'POST':
        channel_id = request.POST.get('channel_id')
        channel = Channel.objects.get(id=channel_id)
        channel.approved = True
        channel.save()
        return redirect('approve_channel')
    
    channels = Channel.objects.filter(approved=False)
    recent_channels = Channel.objects.all().order_by('-id')[:10]
    recent_teachings = Teaching.objects.order_by('-id')[:5]

    return render(request, 'teachings/approve_channel.html', {
        'channels': channels,
        'recent_channels': recent_channels,
        'recent_teachings': recent_teachings,
    })

def teaching_detail(request, channel_id):
    channel = get_object_or_404(Channel, id=channel_id)
    teachings = Teaching.objects.filter(channel=channel)

    context = {
        'channel': channel,
        'teachings': teachings,
    }
    return render(request, 'teachings/teaching_detail.html', context)


@login_required
def user_profile(request):
    # Check if the user has a profile, if not, create one
    if not hasattr(request.user, 'profile'):
        Profile.objects.create(user=request.user)

    if request.method == 'POST':
        form = ProfileForm(request.POST, request.FILES, instance=request.user.profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your profile was successfully updated!')
            return redirect('user_profile')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = ProfileForm(instance=request.user.profile)
    
    return render(request, 'teachings/user_profile.html', {
        'form': form
    })


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()