from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save


class UserMixin(object):
    '''
    This provides default implementations for the methods that Flask-Login
    expects user objects to have.
    '''
    @property
    def is_active(self):
        return True

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False


class AnonymousUserMixin(object):
    '''
    This is the default object for representing an anonymous user.
    '''
    @property
    def is_authenticated(self):
        return False

    @property
    def is_active(self):
        return False

    @property
    def is_anonymous(self):
        return True


# Есть готовые данные в фикстуре. Можно попробовать загрузить.
class Okolotok(models.Model):
    name = models.CharField(
        max_length=20,
        blank=False,
        verbose_name='Номер'
    )

    def __str__(self):
        return f'Околоток {self.name}'

    class Meta:
        verbose_name = 'Оклоток'
        verbose_name_plural = 'Околотки'


# Есть готовые данные в фикстуре. Можно попробовать загрузить.
class ProfileUser(models.Model, UserMixin):
    user_site = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        verbose_name='Пользователь'
    )
    active = models.BooleanField(
        default=True,
        verbose_name='Доступ к сайту'
    )
    okolotok = models.ForeignKey(
        Okolotok,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name='Околоток',
        related_name='users'
    )

    def __str__(self):
        username = self.user_site.username or ''
        first_name = self.user_site.first_name or ''
        last_name = self.user_site.last_name or ''
        okolotok = self.okolotok or ''

        str_text = f'{username} {first_name} {last_name} {okolotok}'

        return str.strip(str_text)

    @property
    def ban_in_bot(self):
        return not self.active

    class Meta:
        verbose_name = 'Данные сотрудника'
        verbose_name_plural = 'Данные сотрудников'


# Есть готовые данные в фикстуре. Можно попробовать загрузить.
class TPTypeWork(models.Model):
    code = models.CharField(
        max_length=20,
        blank=False,
        verbose_name='Код',
    )
    name = models.CharField(
        max_length=200,
        blank=False,
        verbose_name='Наименование',
    )
    du46 = models.BooleanField(
        default=False,
        verbose_name='Запись в ДУ46'
    )

    def __str__(self):
        return f'{self.code} {self.name}'

    class Meta:
        verbose_name = 'Техпроцесс'
        verbose_name_plural = 'Техпроцессы'


# Есть готовые данные в фикстуре. Можно попробовать загрузить.
class Station(models.Model):
    name = models.CharField(
        max_length=50,
        blank=False,
        verbose_name='Название'
    )
    short_name = models.CharField(
        max_length=20,
        blank=False,
        verbose_name='Сокращение'
    )

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Станция'
        verbose_name_plural = 'Станции'


#TODO: Добавить набор станций как другая модель в которой есть все варианты
class ReportOfWork(models.Model):
    data_start = models.DateTimeField(
        default=timezone.now,
        null=False,
        verbose_name='Начало'
    )
    data_end = models.DateTimeField(
        default=timezone.now,
        null=False,
        verbose_name='Конец'
    )
    station = models.ForeignKey(
        Station,
        null=True,
        on_delete=models.SET_NULL, # TODO: возможно лучше другое поведение. (Лучше не удалять эту инфу) Из-за этого изменён вывод str
        verbose_name='Место (станция)',
        related_name='records_du46'
    )
    type_work = models.ManyToManyField(
        TPTypeWork,
        verbose_name='ТехПроцессы',
        related_name='records_du46'
    )
    profile_user = models.ForeignKey(
        ProfileUser,
        null=True,
        on_delete=models.SET_NULL, # TODO: возможно лучше другое поведение. (Лучше не удалять эту инфу) Из-за этого изменён вывод str
        verbose_name='Исполнитель',
        related_name='records_du46'
    )
    note = models.TextField(
        max_length=500,
        blank=True,
        verbose_name='Примечание'
    )
    subdivision = models.CharField(
        max_length=20,
        default='СИТ',
        blank=False,
        verbose_name='Организация-исполнитель'
    )

    def time_delta(self):
        return self.data_end - self.data_start

    def __str__(self):
        ds = self.data_start.strftime("%d %m %Y")
        de = self.data_end.strftime("%d %m %Y")
        station = str(self.station)
        type_work = ", ".join(self.type_work.all().values_list('code', flat=True))
        
        return f'{station} [{ds} - {de}] {type_work}'

    class Meta:
        verbose_name = 'Запись ТП со временем отключения'
        verbose_name_plural = 'Записи ТП со временем отключения'


class PreReportOfWork(models.Model):
    data_start = models.DateTimeField(
        default=None,
        null=True,
        blank=True,
        verbose_name='Начало'
    )
    data_end = models.DateTimeField(
        default=None,
        null=True,
        blank=True,
        verbose_name='Конец'
    )
    status_run = models.BooleanField(
        default=False,
        verbose_name='Запущена?'
    )
    station = models.ForeignKey(
        Station,
        default=None,
        null=True,
        blank=True,
        on_delete=models.SET_NULL, # TODO: возможно лучше другое поведение. (Лучше не удалять эту инфу) Из-за этого изменён вывод str
        verbose_name='Место (станция)',
        related_name='pre_records_du46'
    )
    type_work = models.ManyToManyField(
        TPTypeWork,
        default=None,
        blank=True,
        verbose_name='ТехПроцессы',
        related_name='pre_records_du46'
    )
    profile_user = models.ForeignKey(
        ProfileUser,
        default=None,
        null=True,
        blank=True,
        on_delete=models.SET_NULL, # TODO: возможно лучше другое поведение. (Лучше не удалять эту инфу) Из-за этого изменён вывод str
        verbose_name='Исполнитель',
        related_name='pre_records_du46'
    )
    note = models.TextField(
        max_length=500,
        default=None,
        null=True,
        blank=True,
        verbose_name='Примечание'
    )
    subdivision = models.CharField(
        max_length=20,
        default='СИТ',
        blank=False,
        verbose_name='Организация-исполнитель'
    )

    def time_delta(self):
        return self.data_end - self.data_start

    def __str__(self):
        if self.data_start:
            ds = self.data_start.strftime("%d %m %Y")
        else:
            ds = ""

        if self.data_end:
            de = self.data_end.strftime("%d %m %Y")
        else:
            de = ""
        station = str(self.station)
        return f'{station} [{ds} - {de}] {self.type_work}' # TODO: А как он отображает manytomany?

    class Meta:
        verbose_name = 'Подготовительная запись ТП'
        verbose_name_plural = 'Подготовительные записи ТП'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        ProfileUser.objects.create(user_site=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profileuser.save()
