#!/bin/bash
echo "Start"

source ./env/bin/activate

python manage.py loaddata cms/fixtures/cms.Okolotok.json
python manage.py loaddata cms/fixtures/cms.Station.json
python manage.py loaddata cms/fixtures/cms.TechCard.json
python manage.py loaddata cms/fixtures/cms.DeviceForWork.json

deactivate
echo "END"
