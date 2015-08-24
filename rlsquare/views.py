from rlsquare import app
from flask import render_template, request, jsonify
from flask.ext.pymongo import PyMongo
from rlsquare_gp import model, draw

# db name assumed to be the app name (here, rlsquare)
mongo = PyMongo(app)

### ROUTES
@app.route('/')
def init():
    print app.name
    return render_template('stage.html')


@app.route('/getParams', methods=['POST', 'GET'])
def rlsquare():
    params = getParams()
    # FIXME: actually a placeholder.  should return json'd dict of params like below:
    # resp = {'paramname': paramval}
    # return jsonify(**resp)
    return render_template('stage.html')

def getParams():
    params = mongo.db.params.find_one()  # get random set of params
    print params
    return params

if __name__ == '__main__':
    app.run()
