from django.contrib import admin
from .models import TPTypeWork, Okolotok, Station, ReportOfWork, PreReportOfWork, ProfileUser


###########################################################
# Вспомогательные классы для отображения                  #
###########################################################

# Вообще он мне не нужен
class ProfileUserInline(admin.TabularInline):
    """Отображение пользователей в виде таблицы"""
    model = ProfileUser
    extra = 0
    readonly_fields = ['__str__']


# Вообще он мне не нужен
class ReportOfWorkInline(admin.TabularInline):
    """Отображение работ в виде таблицы"""
    model = ReportOfWork
    extra = 0
    readonly_fields = ['__str__']


###########################################################
# Классы для отображения                                  #
###########################################################

@admin.register(Okolotok)
class OkolotokAdmin(admin.ModelAdmin):
    list_display = ('name', 'id')
    fields = ('name', 'id')
    readonly_fields = ['id']


@admin.register(ProfileUser)
class ProfileUserAdmin(admin.ModelAdmin):
    list_display = ('user_site', 'okolotok', 'active', 'id')
    fields = ('user_site', 'okolotok', 'active', 'id')
    readonly_fields = ['id']


@admin.register(TPTypeWork)
class TPTypeWorkAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'du46', 'id')
    ordering = ('code',)
    search_fields = ('code', 'name',)
    list_filter = ('du46',)
    fields = ('code', 'name','du46', 'id')
    readonly_fields = ['id']
    

@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    list_display = ('name', 'short_name', 'id')
    fields = ('name', 'short_name', 'id')
    readonly_fields = ['id']


@admin.register(ReportOfWork)
class ReportOfWorkAdmin(admin.ModelAdmin):
    list_display = ('data_start', 'data_end', 'station', 'profile_user', 'note', 'subdivision', 'id')
    fields = ('data_start', 'data_end', 'station', 'note', 'profile_user', 'subdivision', 'id', 'type_work')
    filter_horizontal = ('type_work',)
    readonly_fields = ['id']


@admin.register(PreReportOfWork)
class PreReportOfWorkAdmin(admin.ModelAdmin):
    list_display = ('id', 'data_start', 'data_end', 'status_run', 'station', 'profile_user', 'note', 'subdivision')
    fields = ('data_start', 'data_end', 'status_run', 'station', 'note', 'profile_user', 'subdivision', 'id', 'type_work')
    filter_horizontal = ('type_work',)
    readonly_fields = ['id']
