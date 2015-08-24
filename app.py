from flask import Flask, render_template, request
from flask.ext.pymongo import PyMongo

app = Flask(__name__)
mongo = PyMongo(app)

### ROUTES
@app.route('/')
def init():
    return render_template('stage.html')


@app.route('/getParams', methods=['POST', 'GET'])
def rlsquare():
    params = getParams()
    return params

def getParams():
    params = mongo.db.params.find_one()  # get random set of params
    return params

if __name__ == '__main__':
    app.run()
