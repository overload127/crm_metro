import django
from django import forms
from django.contrib.admin.forms import AdminAuthenticationForm

from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox


class HoneypotLoginForm(AdminAuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(HoneypotLoginForm, self).__init__(*args, **kwargs)

    def clean(self):
        """
        Always raise the default error message, because we don't
        care what they entered here.
        """
        raise forms.ValidationError(
            self.error_messages['invalid_login'],
            code='invalid_login',
            params={'username': self.username_field.verbose_name}
        )
    
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)
