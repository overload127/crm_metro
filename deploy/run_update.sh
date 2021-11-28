#!/bin/bash
echo "Start"

echo "Delete autostart (systemctl) (processing...)"
sudo systemctl disable caddy
sudo systemctl stop caddy
sudo systemctl disable gunicorn_crm_metro
sudo systemctl stop gunicorn_crm_metro
echo "Delete autostart (systemctl) (success)"

sudo chown -R USER:USER /crm_service

echo "Connect git (processing...)"
cd /crm_service/get_git/
rm -rf /crm_service/get_git/crm_metro
eval `ssh-agent`
ssh-add ~/.ssh/KEY
git clone GIT_URL
cd crm_metro
git checkout dev
echo "Connect git (success)"

echo "Python install env (processing...)"
rm -rf /crm_service/server
cp -R /crm_service/get_git/crm_metro/server/ /crm_service/server
cd /crm_service/server
python3 -m venv env
source ./env/bin/activate
pip install poetry
poetry install
cp /crm_service/secrets_settings.py /crm_service/server/secrets_settings.py
python manage.py collectstatic
deactivate
echo "Python install env (success)"

echo "yarn (js) install and build (processing...)"
rm -rf /crm_service/web
cp -R /crm_service/get_git/crm_metro/clients/web /crm_service/web
cd /crm_service/web
yarn install
yarn build
echo "yarn (js) install and build (success)"

cd ~
sudo chown -R USER:USER /crm_service

echo "Create autostart (systemctl) (processing...)"
sudo systemctl enable gunicorn
sudo systemctl enable caddy
echo "Create autostart (systemctl) (success)"

sudo systemctl start gunicorn
sudo systemctl start caddy

echo "End"
