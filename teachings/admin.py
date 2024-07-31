from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Category, Channel, Teaching, Profile

class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        (None, {'fields': ('is_teacher', 'is_admin', 'profile_picture', 'phone_no', 'full_name')}),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Category)
admin.site.register(Channel)
admin.site.register(Teaching)
admin.site.register(Profile)

