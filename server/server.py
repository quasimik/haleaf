from flask import Flask
import googleapiclient.discovery
import json
import numpy as np
import os
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.externals import joblib
from sklearn.feature_selection import SelectKBest
from sklearn.pipeline import FeatureUnion
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import LabelBinarizer
from sklearn.model_selection import train_test_split
app = Flask(__name__)

@app.route("/")
def hello():
	datapoint = raw_data.loc[[i]]
    predictions = {}
#     print(str(y_test[i]) + ' / ' + str(proba[i]))
    for feature_pred in COLUMNS_DISEASES:
        features = datapoint.drop(feature_pred, axis='columns').as_matrix().tolist()
#         actual = datapoint.loc[feature_pred]
        predictions[feature_pred] = models[feature_pred].predict(features)[0]
    
    # Display actuals and predictions
    # pprint.pprint(datapoint)
    # pprint.pprint(predictions)
    return predictions

if __name__ == "__main__":
    app.run()