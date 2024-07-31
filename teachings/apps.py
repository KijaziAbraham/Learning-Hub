from django.apps import AppConfig


class TeachingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'teachings'



class TeachingsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'teachings'

    def ready(self):
        import teachings.signals