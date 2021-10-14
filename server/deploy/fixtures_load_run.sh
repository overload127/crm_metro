#!/bin/bash
echo "Start"

source ./env/bin/activate

python manage.py loaddata cms/fixtures/cms.Okolotok.json
python manage.py loaddata cms/fixtures/cms.Station.json
python manage.py loaddata cms/fixtures/cms.TPTypeWork.json

deactivate
echo "END"
