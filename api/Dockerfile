FROM python:3.8-slim-buster
WORKDIR /usr/src/app
COPY ./requirements.txt /usr/src/app
RUN pip3 --disable-pip-version-check install -r requirements.txt
COPY ./Fleact ./Fleact
CMD exec gunicorn -b 0.0.0.0:5000 --workers=2 --threads=4 --worker-class=gthread Fleact:app --log-file=- --access-logfile -
