from django import forms
from django.utils.translation import gettext, gettext_lazy as _
from django.contrib.admin.widgets import FilteredSelectMultiple
from django.contrib.auth.forms import AuthenticationForm

from .models import Okolotok, UserProfile, ReportOfWork

from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Checkbox


class OkolotokAdminForm(forms.ModelForm):
    class Meta:
        model = Okolotok
        fields = '__all__'

    userprofiles = forms.ModelMultipleChoiceField(
        queryset=UserProfile.objects.all(),
        required=False,
        widget=FilteredSelectMultiple(
            verbose_name='Пользователь',
            is_stacked=False
        )
    )

    # report_of_work = forms.ModelChoiceField(
    #     queryset=ReportOfWork.objects.all(),
    #     required=False,
    #     widget=FilteredSelectMultiple(
    #         verbose_name='Пользователь',
    #         is_stacked=False
    #     )
    # )

    def __init__(self, *args, **kwargs):
        super(OkolotokAdminForm, self).__init__(*args, **kwargs)
        if self.instance.pk is not None:
            self.fields['userprofiles'].initial = self.instance.userprofiles.all()

    def save(self, commit=True):
        okolotok = super(OkolotokAdminForm, self).save(commit=False)
        if commit:
            okolotok.save()

        if okolotok.pk is not None:
            okolotok.userprofiles.set(self.cleaned_data['userprofiles'])
            self.save_m2m()

        return okolotok


class AuthAdminForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(AuthAdminForm, self).__init__(*args, **kwargs)

    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)
