# crm_metro
Реализация простой crm для механиков второго участка радиосвязи

backend django

To dump data
python manage.py dumpdata app.model_name --indent 4 > fixtures/file_name.json

To load data:
python manage.py loaddata fixtures/model_name.json --app app.model_name

