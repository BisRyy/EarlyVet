from flask import Flask
from routes import marketplace_blueprint
from models import db
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(marketplace_blueprint, url_prefix='/marketplace')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
