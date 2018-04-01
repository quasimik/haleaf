from sklearn.externals import joblib
import json

def predict(user_data):
  clf = joblib.load('model.pkl')
  return json.loads('["data", {"prediction": clf.predict(user_data) }]')
