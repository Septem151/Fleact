import os


class Config(object):
    APP_NAME = 'Fleact'
    APP_URL = "0.0.0.0"
    PORT = 5000
    ENV = os.environ.get('ENV')
    # SECRET_KEY = os.environ.get('SECRET_KEY')
    if not ENV:
        raise ValueError('Environment has not been set!')


class DevelopmentConfig(Config):
    def __init__(self):
        if not Config.SECRET_KEY:
            self.SECRET_KEY = 'devkey'
        self.DEBUG = True


class ProductionConfig(Config):
    def __init__(self):
        #if not Config.SECRET_KEY:
        #    raise ValueError('Secret Key has not been set!')
        self.DEBUG = False
