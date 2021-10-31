from django.contrib import admin
from django.db.models.aggregates import Count

from .models import TechCard, Okolotok, Station, ReportOfWork, UserProfile, DeviceForWork
from .forms import OkolotokAdminForm

###########################################################
# Вспомогательные классы для отображения                  #
###########################################################


class UserProfileInline(admin.TabularInline):
    """Отображение пользователей в виде таблицы"""
    model = UserProfile
    extra = 0
    readonly_fields = ('__str__',)


# Вообще он мне не нужен
class ReportOfWorkInline(admin.TabularInline):
    """Отображение работ в виде таблицы"""
    model = ReportOfWork
    extra = 0
    readonly_fields = ('__str__',)


###########################################################
# Классы для отображения                                  #
###########################################################

@admin.register(Okolotok)
class OkolotokAdmin(admin.ModelAdmin):
    list_display = ('name', 'count_userprofile', 'count_report_of_work', 'id',)
    fields = ('id', 'name', 'count_userprofile', 'count_report_of_work',)
    readonly_fields = ('count_userprofile', 'count_report_of_work', 'id',)
    search_fields = ('name', 'count_userprofile', 'count_report_of_work',)
    ordering = ('id',)

    def get_queryset(self, request):
        qs = super(OkolotokAdmin, self).get_queryset(request)
        qs = qs.annotate(count_userprofile=Count('userprofile')).order_by('-count_userprofile')
        qs = qs.annotate(count_report_of_work=Count('report_of_work')).order_by('-count_report_of_work')
        return qs

    def count_userprofile(self, instance):
        return instance.count_userprofile
    
    count_userprofile.short_description = 'Работников'
    count_userprofile.admin_order_field = 'count_userprofile'

    def count_report_of_work(self, instance):
        return instance.count_report_of_work

    count_report_of_work.short_description = 'Выполненных техпроцессов'
    count_report_of_work.admin_order_field = 'count_report_of_work'

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'okolotok', 'count_report_of_work', 'id',)
    fields = ('user', 'okolotok', 'count_report_of_work', 'id',)
    readonly_fields = ('id', 'count_report_of_work',)
    search_fields = ('user__username', 'okolotok__name',)

    # This will help you to disbale add functionality
    def has_add_permission(self, request):
        return False

    # This will help you to disable delete functionaliyt
    def has_delete_permission(self, request, obj=None):
        return False

    def get_queryset(self, request):
        qs = super(UserProfileAdmin, self).get_queryset(request)
        qs = qs.annotate(count_report_of_work=Count('report_of_work')).order_by('-count_report_of_work')
        return qs

    def count_report_of_work(self, instance):
        return instance.count_report_of_work

    count_report_of_work.short_description = 'Выполненных техпроцессов'
    count_report_of_work.admin_order_field = 'count_report_of_work'


@admin.register(DeviceForWork)
class DeviceForWorkAdmin(admin.ModelAdmin):
    list_display = ('name', 'count_tech_card', 'id')
    fields = ('name', 'description', 'count_tech_card', 'id')
    ordering = ('id',)
    search_fields = ('name',)
    readonly_fields = ('count_tech_card', 'id',)

    def get_queryset(self, request):
        qs = super(DeviceForWorkAdmin, self).get_queryset(request)
        qs = qs.annotate(count_tech_card=Count('tech_card')).order_by('-count_tech_card')
        return qs

    def count_tech_card(self, instance):
        return instance.count_tech_card

    count_tech_card.short_description = 'Количество техкарт'
    count_tech_card.admin_order_field = 'count_tech_card'


@admin.register(TechCard)
class TechCardAdmin(admin.ModelAdmin):
    list_display_links = ('code', 'name',)
    list_display = ('code', 'name', 'du46', 'order', 'id')
    fields = ('code', 'name', 'description', 'device_for_work', 'du46', 'order', 'id')
    ordering = ('code',)
    search_fields = ('code', 'name', 'description')
    list_filter = ('du46', 'order', 'device_for_work',)
    filter_horizontal = ('device_for_work',)
    readonly_fields = ['id']


@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    list_display = ('name', 'short_name', 'count_report_of_work', 'id',)
    fields = ('name', 'short_name', 'count_report_of_work', 'id',)
    search_fields = ('name', 'short_name',)
    readonly_fields = ('count_report_of_work', 'id',)

    def get_queryset(self, request):
        qs = super(StationAdmin , self).get_queryset(request)
        qs = qs.annotate(count_report_of_work=Count('report_of_work')).order_by('-count_report_of_work')
        return qs

    def count_report_of_work(self, instance):
        return instance.count_report_of_work

    count_report_of_work.short_description = 'Выполненных техпроцессов'
    count_report_of_work.admin_order_field = 'count_report_of_work'


@admin.register(ReportOfWork)
class ReportOfWorkAdmin(admin.ModelAdmin):
    list_display = ('date_start', 'date_end', 'station', 'okolotok', 'note', 'subdivision', 'id')
    fields = ('date_start', 'date_end', 'station', 'note', 'userprofile', 'okolotok', 'subdivision', 'id', 'type_work')
    filter_horizontal = ('type_work', 'userprofile',)
    readonly_fields = ('id',)
    ordering = ('date_start', 'date_end')

