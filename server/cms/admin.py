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
    list_display = ('name', 'count_userprofiles', 'count_reports_of_work', 'id',)
    fields = ('id', 'name', 'count_userprofiles', 'count_reports_of_work',)
    readonly_fields = ('count_userprofiles', 'count_reports_of_work', 'id',)
    search_fields = ('name', 'count_userprofiles', 'count_reports_of_work',)
    ordering = ('id',)

    def get_queryset(self, request):
        qs = super(OkolotokAdmin, self).get_queryset(request)
        qs = qs.annotate(count_userprofiles=Count('userprofiles')).order_by('-count_userprofiles')
        qs = qs.annotate(count_reports_of_work=Count('reports_of_work')).order_by('-count_reports_of_work')
        return qs

    def count_userprofiles(self, instance):
        return instance.count_userprofiles
    
    count_userprofiles.short_description = 'Работников'
    count_userprofiles.admin_order_field = 'count_userprofiles'

    def count_reports_of_work(self, instance):
        return instance.count_reports_of_work

    count_reports_of_work.short_description = 'Выполненных техпроцессов'
    count_reports_of_work.admin_order_field = 'count_reports_of_work'

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'okolotok', 'count_reports_of_work', 'id',)
    fields = ('user', 'okolotok', 'count_reports_of_work', 'id',)
    readonly_fields = ('id', 'count_reports_of_work',)
    search_fields = ('user__username', 'okolotok__name',)

    # This will help you to disbale add functionality
    def has_add_permission(self, request):
        return False

    # This will help you to disable delete functionaliyt
    def has_delete_permission(self, request, obj=None):
        return False

    def get_queryset(self, request):
        qs = super(UserProfileAdmin, self).get_queryset(request)
        qs = qs.annotate(count_reports_of_work=Count('reports_of_work')).order_by('-count_reports_of_work')
        return qs

    def count_reports_of_work(self, instance):
        return instance.count_reports_of_work

    count_reports_of_work.short_description = 'Выполненных техпроцессов'
    count_reports_of_work.admin_order_field = 'count_reports_of_work'


@admin.register(DeviceForWork)
class DeviceForWorkAdmin(admin.ModelAdmin):
    list_display = ('name', 'count_tech_cards', 'id')
    fields = ('name', 'description', 'count_tech_cards', 'id')
    ordering = ('id',)
    search_fields = ('name',)
    readonly_fields = ('count_tech_cards', 'id',)

    def get_queryset(self, request):
        qs = super(DeviceForWorkAdmin, self).get_queryset(request)
        qs = qs.annotate(count_tech_cards=Count('tech_cards')).order_by('-count_tech_cards')
        return qs

    def count_tech_cards(self, instance):
        return instance.count_tech_cards

    count_tech_cards.short_description = 'Количество техкарт'
    count_tech_cards.admin_order_field = 'count_tech_cards'


@admin.register(TechCard)
class TechCardAdmin(admin.ModelAdmin):
    list_display_links = ('code', 'name',)
    list_display = ('code', 'name', 'du46', 'order', 'count_reports_of_work', 'id')
    fields = ('code', 'name', 'description', 'devices_for_work', 'du46', 'order', 'count_reports_of_work', 'id')
    ordering = ('code',)
    search_fields = ('code', 'name', 'description', 'count_reports_of_work', 'id',)
    list_filter = ('du46', 'order', 'devices_for_work',)
    filter_horizontal = ('devices_for_work',)
    readonly_fields = ('id', 'count_reports_of_work',)

    def get_queryset(self, request):
        qs = super(TechCardAdmin, self).get_queryset(request)
        qs = qs.annotate(count_reports_of_work=Count('reports_of_work')).order_by('-count_reports_of_work')
        return qs

    def count_reports_of_work(self, instance):
        return instance.count_reports_of_work

    count_reports_of_work.short_description = 'Выполненных техпроцессов'
    count_reports_of_work.admin_order_field = 'count_reports_of_work'


@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    list_display = ('name', 'short_name', 'count_reports_of_work', 'id',)
    fields = ('name', 'short_name', 'count_reports_of_work', 'id',)
    search_fields = ('name', 'short_name',)
    readonly_fields = ('count_reports_of_work', 'id',)

    def get_queryset(self, request):
        qs = super(StationAdmin , self).get_queryset(request)
        qs = qs.annotate(count_reports_of_work=Count('reports_of_work')).order_by('-count_reports_of_work')
        return qs

    def count_reports_of_work(self, instance):
        return instance.count_reports_of_work

    count_reports_of_work.short_description = 'Выполненных техпроцессов'
    count_reports_of_work.admin_order_field = 'count_reports_of_work'


@admin.register(ReportOfWork)
class ReportOfWorkAdmin(admin.ModelAdmin):
    list_display = ('date_start', 'date_end', 'station', 'okolotok', 'note', 'subdivision', 'id')
    fields = ('date_start', 'date_end', 'station', 'note', 'userprofiles', 'okolotok', 'subdivision', 'id', 'tech_cards')
    filter_horizontal = ('tech_cards', 'userprofiles',)
    readonly_fields = ('id',)
    ordering = ('date_start', 'date_end')

