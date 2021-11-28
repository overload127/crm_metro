# crm_metro

Реализация простой crm для механиков второго участка радиосвязи

backend django

To dump data
python manage.py dumpdata app.model_name --indent 4 > fixtures/file_name.json

To load data:
python manage.py loaddata fixtures/model_name.json --app app.model_name

init static for new admin theme 'grappelli'
python manage.py collectstatic

Инфа про бэк:
Используется ловушка с фейковым входом. Для переопределения формы и шаблона пришлось скопировать все приложение к себе в проект.

/home/crm_metro_user/crm_metro/server/env/bin/gunicorn --access-logfile /home/crm_metro_user/crm_metro/log/gunicorn/access.log --error-logfile /home/crm_metro_user/crm_metro/log/gunicorn/error.log --capture-output -k uvicorn.workers.UvicornWorker --workers 3 --bind unix:/run/gunicorn_crm_metro.sock metro_cms_reset.asgi:application

install instruct

sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo tee /etc/apt/trusted.gpg.d/caddy-stable.asc
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

sudo mkdir /crm_service
sudo mkdir /crm_service/get_git
sudo chown -R USER:USER /crm_service

cd /crm_service/get_git/
eval `ssh-agent`
ssh-add ~/.ssh/KEY
git clone GIT_URL
git checkout dev

cp -R /crm_metro/get_git/crm_metro/server/ /crm_metro/server
cd /crm_service/server

python3 -m venv env
source ./env/bin/activate
pip install poetry
poetry install
deactivate

in settings set:
DEBUG = False
ALLOWED_HOSTS = [your_domain]
DATABASES = {
'default': {
'ENGINE': 'django.db.backends.postgresql_psycopg2',
'NAME': secrets_settings.DB_NAME,
'USER': secrets_settings.DB_USER_NAME,
'PASSWORD': secrets_settings.DB_USER_PASSWORD,
'HOST': 'localhost',
'PORT': '',
}
}

in setttings delete:
INTERNAL_IPS
and app and midleware

nano /crm_metro/server/secrets_settings.py

cd /crm_service
mkdir log
mkdir log/caddy
mkdir log/caddy/drsmetro.ru
mkdir log/caddy/api.drsmetro.ru
mkdir log/caddy/admin.drsmetro.ru
mkdir log/gunicorn

sudo cp /crm_service/get_git/crm_metro/deploy/Caddyfile /etc/caddy/Caddyfile
sudo cp /crm_service/get_git/crm_metro/deploy/caddy.service /etc/systemd/system/caddy.service
sudo cp /crm_service/get_git/crm_metro/deploy/gunicorn_crm_metro.service /etc/systemd/system/gunicorn_crm_metro.service
sudo cp /crm_service/get_git/crm_metro/deploy/gunicorn_crm_metro.socket /etc/systemd/system/gunicorn_crm_metro.socket

Установите npm (nodejs) по инструкции из инета. Она сеняется от версии к версии. В репозитории обычно доступна 8 версия тогда как проект работает на 14

sudo npm install --global yarn
cp -R /crm_service/get_git/crm_metro/clients/web /crm_service/web
cd /crm_service/web
yarn install
yarn build

cd ~
sudo chown -R USER:USER /crm_service

sudo systemctl enable gunicorn_crm_metro
sudo systemctl enable caddy

sudo systemctl start gunicorn_crm_metro
sudo systemctl start caddy

systemctl daemon-reload
sudo systemctl status gunicorn_crm_metro
sudo systemctl status caddy
sudo systemctl restart gunicorn_crm_metro
sudo systemctl restart caddy

sudo journalctl -u gunicorn_crm_metro.socket
sudo journalctl -u gunicorn_crm_metro.service
sudo journalctl -u caddy.service
