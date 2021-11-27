#!/bin/bash
echo "Start"

echo "Delete autostart (systemctl) (processing...)"
sudo systemctl disable caddy
sudo systemctl stop caddy
sudo systemctl disable gunicorn_crm_metro
sudo systemctl stop gunicorn_crm_metro
echo "Delete autostart (systemctl) (success)"

echo "Connect git (processing...)"
eval `ssh-agent`
ssh-add ~/.ssh/dels_web_id_rsa
echo "Connect git (success)"

echo "Clone git (processing...)"
cd /crm_metro/
git clone git@gitlab.com:e_vladimir/rt_web_2.git
cd rt_web_2/
git checkout dev
echo "Clone git (success)"

echo "Python install env (processing...)"
cd server/
python3 -m venv env
source ./env/bin/activate
pip install poetry
poetry install
cp -r db_api/rt_api_v1 env/lib/python3.8/site-packages/rt_api_v1
deactivate
echo "Python install env (success)"

echo "yarn (js) install and build (processing...)"
cd ../client/web/
yarn install
yarn build
echo "yarn (js) install and build (success)"

echo "Create autostart (systemctl) (processing...)"
sudo systemctl enable gunicorn
sudo systemctl enable caddy
echo "Create autostart (systemctl) (success)"

sudo systemctl start gunicorn
sudo systemctl start caddy

echo "End"
