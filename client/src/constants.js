export const initData = {
  age_group: -1,
  height_cm: -1,
  weight_kg: -1,
  sex: -1,
  married: -1,
  education: -1,
  employment: -1,
  income: -1,
  own_home: -1,
  veteran: -1,
  alcohol: -1,
  smoke: -1,
  race: -1,
  state: -1,
  high_blood_pressure: -1,
  high_blood_cholesterol: -1,
  heart_attack: -1,
  angina: -1,
  asthma: -1,
  skin_cancer: -1,
  other_cancer: -1,
  copd: -1,
  arthritis: -1,
  depression: -1,
  kidney_disease: -1,
  diabetes: -1
}

export const dataToVector = (data) => {
  if(data) {
    var vector = [
      0,
      data.age_group,
      data.height_cm,
      data.weight_kg,
      data.sex,
      data.married,
      data.education,
      data.employment,
      data.income,
      data.own_home,
      data.veteran,
      data.alcohol,
      data.smoke,
      data.race,
      data.state,
      data.high_blood_pressure,
      data.high_blood_cholesterol,
      data.heart_attack,
      data.angina,
      data.asthma,
      data.skin_cancer,
      data.other_cancer,
      data.copd,
      data.arthritis,
      data.depression,
      data.kidney_disease,
      data.diabetes
    ];
    for(var i=0; i<vector.length; i++) {
      if(isNaN(vector[i])) {
        vector[i] = -1;
      }
    }
    return vector;
  }
  else {
    return initData;
  }
}

export const age_group = [
  {value: -1, text: "Select"},
  {value: 1, text: "18-24"},
  {value: 2, text: "25-29"},
  {value: 3, text: "30-34"},
  {value: 4, text: "35-39"},
  {value: 5, text: "40-44"},
  {value: 6, text: "45-49"},
  {value: 7, text: "50-54"},
  {value: 8, text: "55-59"},
  {value: 9, text: "60-64"},
  {value: 10, text: "65-69"},
  {value: 11, text: "70-74"},
  {value: 12, text: "75-79"},
  {value: 13, text: ">79"},
];

export const height_cm = [
  {value: -1, text: "Select"},
  {value: 1, text: "Under 2's"},
  {value: 2, text: "Later"},
  {value: 3, text: "Later"},
  {value: 4, text: "Later"},
  {value: 5, text: "Later"},
  {value: 6, text: "Later"},
  {value: 7, text: "Later"},
  {value: 8, text: "Later"},
  {value: 9, text: "Later"},
  {value: 10, text: "Over 9's"},
];

export const weight_kg = [
  {value: -1, text: "Select"},
  {value: 1, text: "Under 2's"},
  {value: 2, text: "Later"},
  {value: 3, text: "Later"},
  {value: 4, text: "Later"},
  {value: 5, text: "Later"},
  {value: 6, text: "Later"},
  {value: 7, text: "Later"},
  {value: 8, text: "Later"},
  {value: 9, text: "Later"},
  {value: 10, text: "Over 9's"},
];

export const sex = [
  {value: -1, text: "Select"},
  {value: 1, text: "Male"},
  {value: 2, text: "Female"},
];

export const married = [
  {value: -1, text: "Select"},
  {value: 1, text: "Married"},
  {value: 2, text: "Divorced"},
  {value: 3, text: "Widowed"},
  {value: 4, text: "Separated"},
  {value: 5, text: "Never married"},
  {value: 6, text: "Engaged"},
];

export const education = [
  {value: -1, text: "Select"},
  {value: 1, text: "Kindergarten or below"},
  {value: 2, text: "Elementary"},
  {value: 3, text: "Middle school"},
  {value: 4, text: "High school"},
  {value: 5, text: "Bachelor"},
  {value: 6, text: "Graduate"},
];

export const employment = [
  {value: -1, text: "Select"},
  {value: 1, text: "Employed for wages"},
  {value: 2, text: "Self-employed"},
  {value: 3, text: "Out of work for at least a year"},
  {value: 4, text: "Out of work for less than a year"},
  {value: 5, text: "Homemaker"},
  {value: 6, text: "Student"},
  {value: 7, text: "Retired"},
  {value: 8, text: "Unable to work"},
];

export const income = [
  {value: -1, text: "Select"},
  {value: 1, text: "< $15000"},
  {value: 2, text: "$15000 - $25000"},
  {value: 3, text: "$25000 - $35000"},
  {value: 4, text: "$35000 - $50000"},
  {value: 5, text: "> $50000"},
];

export const own_home = [
  {value: -1, text: "Select"},
  {value: 1, text: "Home owner"},
  {value: 2, text: "Renter"},
  {value: 3, text: "Other arrangement"},
];

export const veteran = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

export const smoke = [
  {value: -1, text: "Select"},
  {value: 1, text: "Daily"},
  {value: 2, text: "Occasionally"},
  {value: 3, text: "Stopped"},
  {value: 4, text: "Never"},
];

export const race = [
  {value: -1, text: "Select"},
  {value: 1, text: "White"},
  {value: 2, text: "African American"},
  {value: 3, text: "Native American/Alaskan Native"},
  {value: 4, text: "Asian"},
  {value: 5, text: "Native Hawaiian/Pacific Islander"},
  {value: 6, text: "Other"},
  {value: 7, text: "Multiracial"},
];

export const state = [
  {value: -1, text: "Select"},
  {value: 1, text: "Alabama"},
  {value: 2, text: "Alaska"},
  {value: 4, text: "Arizona"},
  {value: 5, text: "Arkansas"},
  {value: 6, text: "California"},
  {value: 8, text: "Colorado"},
  {value: 9, text: "Conneticut"},
  {value: 10, text: "Delaware"},
  {value: 11, text: "District of Columbia"},
  {value: 12, text: "Florida"},
  {value: 13, text: "Georgia"},
  {value: 15, text: "Hawaii"},
  {value: 16, text: "Idaho"},
  {value: 17, text: "Illinois"},
  {value: 18, text: "Indiana"},
  {value: 19, text: "Iowa"},
  {value: 20, text: "Kansas"},
  {value: 21, text: "Kentucky"},
  {value: 22, text: "Louisiana"},
  {value: 23, text: "Maine"},
  {value: 24, text: "Maryland"},
  {value: 25, text: "Massachusetts"},
  {value: 26, text: "Michigan"},
  {value: 27, text: "Minnesota"},
  {value: 28, text: "Mississippi"},
  {value: 29, text: "Missouri"},
  {value: 30, text: "Montana"},
  {value: 31, text: "Nebraska"},
  {value: 32, text: "Nevada"},
  {value: 33, text: "New Hampshire"},
  {value: 34, text: "New Jersey"},
  {value: 35, text: "New Mexico"},
  {value: 36, text: "New York"},
  {value: 37, text: "North Carolina"},
  {value: 38, text: "North Dakota"},
  {value: 39, text: "Ohio"},
  {value: 40, text: "Oklahoma"},
  {value: 41, text: "Oregon"},
  {value: 42, text: "Pennslyvania"},
  {value: 44, text: "Rhode Island"},
  {value: 45, text: "South Carolina"},
  {value: 46, text: "South Dakota"},
  {value: 47, text: "Tennesee"},
  {value: 48, text: "Texas"},
  {value: 49, text: "Utah"},
  {value: 50, text: "Vermont"},
  {value: 51, text: "Virginia"},
  {value: 53, text: "Washington"},
  {value: 54, text: "West Virginia"},
  {value: 55, text: "Wisconsin"},
  {value: 56, text: "Wyoming"},
  {value: 66, text: "Guam"},
  {value: 72, text: "Puerto Rico"},
];

export const high_blood_pressure = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "When pregnant"},
  {value: 3, text: "No"},
  {value: 4, text: "No, but borderline"},
];

export const high_blood_cholesterol = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

export const heart_attack = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

export const angina = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

export const asthma = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

export const skin_cancer = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

export const other_cancer = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

export const copd = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

export const arthritis = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

export const depression = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

export const kidney_disease = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

export const diabetes = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "Only when pregnant"},
  {value: 3, text: "No"},
  {value: 4, text: "No, but at risk"},
];
