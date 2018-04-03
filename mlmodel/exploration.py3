DATASET_PATH = 'datasets/1000sample2015.csv' # Using the small dataset for now
FEATURES_JSON_PATH = 'datasets/features-small.json'

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

with open(DATASET_PATH, 'r') as file:
    raw_data = pd.read_csv(file)

with open(FEATURES_JSON_PATH, 'r') as file:
	features_json = json.loads(file.read())

print(features_json)
