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

# Define the format of your input data including unused columns (These are the columns from the census data files)
CATEGORICAL_COLUMNS = (
    'age_group',
    'height_cm',
    'weight_kg',
    'sex',
    'married',
    'education',
    'employment',
    'income',
    'own_home',
    'veteran',
    'alchohol',
    'smoke',
    'race',
    'state',
    'high_blood_pressure',
    'high_blood_cholestrol',
    'heart_attack',
    'angina',
    'asthma',
    'skin_cancer',
    'other_cancer',
    'Chronic_Obstructive_Pulmonary_Disease',
    'arthritis',
    'depression',
    'kidney_disease',
    'diabetes'
)

# Categorical columns are columns that need to be turned into a numerical value to be used by scikit-learn
COLUMNS = (
    'height_cm',
    'weight_kg'
)


# Load the training census dataset
with open('./all_h&w_raw.csv', 'r') as train_data:
    raw_training_data = pd.read_csv(train_data)

# Remove the column we are trying to predict ('income-level') from our features list
# Convert the Dataframe to a lists of lists
features = raw_training_data.drop('other-cancer', axis=1).as_matrix().tolist()
# Create our training labels list, convert the Dataframe to a lists of lists
labels = (raw_training_data['other-cancer'] == 1).as_matrix().tolist()


# # Load the test census dataset
# with open('./census_data/adult.test', 'r') as test_data:
#     raw_testing_data = pd.read_csv(test_data, names=COLUMNS, skiprows=1)
# # Remove the column we are trying to predict ('income-level') from our features list
# # Convert the Dataframe to a lists of lists
# test_features = raw_testing_data.drop('income-level', axis=1).as_matrix().tolist()
# # Create our training labels list, convert the Dataframe to a lists of lists
# test_labels = (raw_testing_data['income-level'] == ' >50K.').as_matrix().tolist()


train_features, test_features, train_labels, test_labels = train_test_split(features, labels, test_size=0.33, random_state=69)

# Since the census data set has categorical features, we need to convert
# them to numerical values. We'll use a list of pipelines to convert each
# categorical column and then use FeatureUnion to combine them before calling
# the RandomForestClassifier.
categorical_pipelines = []

# Each categorical column needs to be extracted individually and converted to a numerical value.
# To do this, each categorical column will use a pipeline that extracts one feature column via
# SelectKBest(k=1) and a LabelBinarizer() to convert the categorical value to a numerical one.
# A scores array (created below) will select and extract the feature column. The scores array is
# created by iterating over the COLUMNS and checking if it is a CATEGORICAL_COLUMN.
for i, col in enumerate(COLUMNS[:-1]):
    if col in CATEGORICAL_COLUMNS:
        # Create a scores array to get the individual categorical column.
        # Example:
        #  data = [39, 'State-gov', 77516, 'Bachelors', 13, 'Never-married', 'Adm-clerical', 
        #         'Not-in-family', 'White', 'Male', 2174, 0, 40, 'United-States']
        #  scores = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        #
        # Returns: [['Sate-gov']]
        scores = []
        # Build the scores array
        for j in range(len(COLUMNS[:-1])):
            if i == j: # This column is the categorical column we want to extract.
                scores.append(1) # Set to 1 to select this column
            else: # Every other column should be ignored.
                scores.append(0)
        skb = SelectKBest(k=1)
        skb.scores_ = scores
        # Convert the categorical column to a numerical value
        lbn = LabelBinarizer()
        r = skb.transform(train_features)
        lbn.fit(r)
        # Create the pipeline to extract the categorical feature
        categorical_pipelines.append(
            ('categorical-{}'.format(i), Pipeline([
                ('SKB-{}'.format(i), skb),
                ('LBN-{}'.format(i), lbn)])))

# Create pipeline to extract the numerical features
skb = SelectKBest(k=6)
# From COLUMNS use the features that are numerical
skb.scores_ = [1, 1]
categorical_pipelines.append(('numerical', skb))

# Combine all the features using FeatureUnion
preprocess = FeatureUnion(categorical_pipelines)

# Create the classifier
classifier = RandomForestClassifier()

# Transform the features and fit them to the classifier
classifier.fit(preprocess.transform(train_features), train_labels)

# Create the overall model as a single pipeline
pipeline = Pipeline([
    ('union', preprocess),
    ('classifier', classifier)
])

# Export the model to a file
joblib.dump(pipeline, 'model.joblib')

print('Model trained and saved')