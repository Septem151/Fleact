from flask import Flask
from Fleact import config

app = Flask(__name__)

if config.Config.ENV == 'development':
    app_config = config.DevelopmentConfig()
elif config.Config.ENV == 'production':
    app_config = config.ProductionConfig()
else:
    raise ValueError('Unknown environment configuration!')

app.config.from_object(app_config)
from Fleact import routes # noqa E402,F401
