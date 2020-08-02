import os


class Config(object):
    APP_NAME = 'Fleact'
    APP_URL = os.environ.get('APP_URL')
    PORT = os.environ.get('API_PORT')
    DEBUG = os.environ.get('API_DEBUG')
    ENV = os.environ.get('ENV')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    if not ENV:
        raise ValueError('Environment has not been set!')
    if APP_URL:
        if APP_URL.startswith('http://'):
            APP_URL = APP_URL[7:]
        elif APP_URL.startswith('https://'):
            APP_URL = APP_URL[8:]


class DevelopmentConfig(Config):
    def __init__(self):
        if not Config.APP_URL:
            self.APP_URL = '0.0.0.0'
        if not Config.PORT:
            self.PORT = 5000
        if not Config.SECRET_KEY:
            self.SECRET_KEY = 'devkey'
        self.DEBUG = True


class ProductionConfig(Config):
    def __init__(self):
        if not Config.APP_URL:
            raise ValueError('App URL has not been set!')
        if not Config.PORT:
            raise ValueError('Port has not been set!')
        if not Config.SECRET_KEY:
            raise ValueError('Secret Key has not been set!')
        self.DEBUG = False
