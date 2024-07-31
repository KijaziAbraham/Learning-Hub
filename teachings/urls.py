from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='registration/logout.html'), name='logout'),
    path('upload_teaching/', views.upload_teaching, name='upload_teaching'),
    path('request_channel/', views.request_channel, name='request_channel'),
    path('approve_channel/', views.approve_channel, name='approve_channel'),
    path('teachings_list/', views.teachings_list, name='teachings_list'),
    path('teaching/<int:channel_id>/', views.teaching_detail, name='teaching_detail'),
    path('profile/', views.user_profile, name='user_profile'),
    path('teachings/', views.teachings_list, name='teachings_list'),




]
