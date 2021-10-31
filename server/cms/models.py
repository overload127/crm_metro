from django.db import models
from django.dispatch import receiver
from django.contrib.admin import display
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.safestring import mark_safe
from django.db.models.signals import post_save
from django.db.models.aggregates import Count
from django.urls import reverse


DEFAULT_OKOLOTOK_ID = 0


# Есть готовые данные в фикстуре. Можно попробовать загрузить.
class Okolotok(models.Model):
    name = models.CharField(
        max_length=20,
        blank=False,
        verbose_name='Номер'
    )

    def count_userprofile(self):
        return self.userprofile.count()

    def count_report_of_work(self):
        return self.report_of_work.count()

    def __str__(self):
        if self.pk == 0:
            return self.name

        return f'Околоток {self.name}'

    class Meta:
        verbose_name = 'Оклоток'
        verbose_name_plural = 'Околотки'


# Есть готовые данные в фикстуре. Можно попробовать загрузить.
class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        verbose_name='Пользователь',
        related_name='userprofile'
    )
    okolotok = models.ForeignKey(
        Okolotok,
        default=DEFAULT_OKOLOTOK_ID,
        on_delete=models.PROTECT,
        verbose_name='Околоток',
        related_name='userprofile'
    )

    def count_report_of_work(self):
        return self.report_of_work.count()

    def __str__(self):
        if self.id is None:
            return None

        okolotok = self.okolotok or ''
        str_text = f'{self.user} {okolotok}'

        return str.strip(str_text)

    class Meta:
        verbose_name = 'Данные сотрудника'
        verbose_name_plural = 'Данные сотрудников'


class DeviceForWork(models.Model):
    name = models.CharField(
        max_length=200,
        blank=False,
        verbose_name='Наименование',
    )
    description = models.TextField(
        blank = True,
        verbose_name='Описание',
    )

    def count_tech_card(self):
        return self.tech_card.count()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Инструмент для работы'
        verbose_name_plural = 'Инструменты для работы'


# Есть готовые данные в фикстуре. Можно попробовать загрузить.
class TechCard(models.Model):
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
    description = models.TextField(
        blank = True,
        verbose_name='Описание',
    )
    du46 = models.BooleanField(
        default=False,
        verbose_name='ДУ46'
    )
    order  = models.BooleanField(
        default=False,
        verbose_name='журнал распоряжений'
    )
    device_for_work = models.ManyToManyField(
        DeviceForWork,
        blank=True,
        verbose_name='Инструмент для работы',
        related_name='tech_card',
    )

    def __str__(self):
        return f'{self.code} {self.name}'

    class Meta:
        verbose_name = 'Техкарта'
        verbose_name_plural = 'Техкарты'


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

    def count_report_of_work(self):
        return self.report_of_work.count()

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Станция'
        verbose_name_plural = 'Станции'


class ReportOfWork(models.Model):
    date_start = models.DateTimeField(
        default=timezone.now,
        null=False,
        verbose_name='Начало'
    )
    date_end = models.DateTimeField(
        default=timezone.now,
        null=False,
        verbose_name='Конец'
    )
    station = models.ForeignKey(
        Station,
        on_delete=models.PROTECT,
        verbose_name='Место (станция)',
        related_name='report_of_work'
    )
    type_work = models.ManyToManyField(
        TechCard,
        verbose_name='ТехПроцессы',
        related_name='report_of_work'
    )
    userprofile = models.ManyToManyField(
        UserProfile,
        verbose_name='Исполнитель',
        related_name='report_of_work'
    )
    okolotok = models.ForeignKey(
        Okolotok,
        on_delete=models.PROTECT,
        verbose_name='Околоток',
        related_name='report_of_work'
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
        return self.date_end - self.date_start

    def __str__(self):
        ds = self.date_start.strftime("%d %m %Y")
        de = self.date_end.strftime("%d %m %Y")
        station = str(self.station)
        type_work = ", ".join(self.type_work.all().values_list('code', flat=True))
        
        return f'{station} [{ds} - {de}] {type_work}'

    class Meta:
        verbose_name = 'Запись ТП со временем отключения'
        verbose_name_plural = 'Записи ТП со временем отключения'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()
