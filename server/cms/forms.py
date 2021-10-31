from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple

from .models import Okolotok, UserProfile, ReportOfWork


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
            self.fields['userprofiles'].initial = self.instance.userprofile.all()

    def save(self, commit=True):
        okolotok = super(OkolotokAdminForm, self).save(commit=False)
        if commit:
            okolotok.save()

        if okolotok.pk is not None:
            okolotok.userprofile.set(self.cleaned_data['userprofiles'])
            self.save_m2m()

        return okolotok