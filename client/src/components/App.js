import React, { Component } from "react";
import "./App.css";
import { db, auth, provider } from "../firebase";
import { Header, 
         Button, 
         Segment, 
         Icon, 
         Container, 
         Grid, 
         Menu, 
         Input, 
         Select, 
         Table } from "semantic-ui-react";

const initData = {
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

const dataToVector = (data) => {
  if(data) {
    var vector = [  
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
    console.log(vector);
    return vector;
  }
  else {
    return initData;
  }
}

dataToVector({});

const age_group = [
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

const height_cm = [
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

const weight_kg = [
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

const sex = [
  {value: -1, text: "Select"},
  {value: 1, text: "Male"},
  {value: 2, text: "Female"},
];

const married = [
  {value: -1, text: "Select"},
  {value: 1, text: "Married"},
  {value: 2, text: "Divorced"},
  {value: 3, text: "Widowed"},
  {value: 4, text: "Separated"},
  {value: 5, text: "Never married"},
  {value: 6, text: "Engaged"},
];

const education = [
  {value: -1, text: "Select"},
  {value: 1, text: "Kindergarten or below"},
  {value: 2, text: "Elementary"},
  {value: 3, text: "Middle school"},
  {value: 4, text: "High school"},
  {value: 5, text: "Bachelor"},
  {value: 6, text: "Graduate"},
];

const employment = [
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

const income = [
  {value: -1, text: "Select"},
  {value: 1, text: "< $15000"},
  {value: 2, text: "$15000 - $25000"},
  {value: 3, text: "$25000 - $35000"},
  {value: 4, text: "$35000 - $50000"},
  {value: 5, text: "> $50000"},
];

const own_home = [
  {value: -1, text: "Select"},
  {value: 1, text: "Home owner"},
  {value: 2, text: "Renter"},
  {value: 3, text: "Other arrangement"},
];

const veteran = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

// Alcohol is a prompt for amount of times per month that one drinks

const smoke = [
  {value: -1, text: "Select"},
  {value: 1, text: "Daily"},
  {value: 2, text: "Occasionally"},
  {value: 3, text: "Stopped"},
  {value: 4, text: "Never"},
];

const race = [
  {value: -1, text: "Select"},
  {value: 1, text: "White"},
  {value: 2, text: "African American"},
  {value: 3, text: "Native American/Alaskan Native"},
  {value: 4, text: "Asian"},
  {value: 5, text: "Native Hawaiian/Pacific Islander"},
  {value: 6, text: "Other"},
  {value: 7, text: "Multiracial"},
];

const state = [
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

const high_blood_pressure = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "When pregnant"},
  {value: 3, text: "No"},
  {value: 4, text: "No, but borderline"},
];

const high_blood_cholesterol = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

const heart_attack = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

const angina = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

const asthma = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

const skin_cancer = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

const other_cancer = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

const copd = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

const arthritis = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

const depression = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

const kidney_disease = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "No"},
];

const diabetes = [
  {value: -1, text: "Select"},
  {value: 1, text: "Yes"},
  {value: 2, text: "Only when pregnant"},
  {value: 3, text: "No"},
  {value: 4, text: "No, but at risk"},
];


class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      uid: null,
      ref: null,
      data: initData,
      tab: "demo"
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const ref = db.ref(uid);
        this.getData(ref);
        this.setState({ user, uid, ref });
      } 
    });
  }

  logout = () => {
    auth.signOut().then(() => {
      this.setState({ user: null, uid: null, ref: null, data: null });
    });
  }

  login = () => {
    auth.signInWithPopup(provider).then((result) => {
      console.log(result);
      const user = result.user;
      const uid = user.uid;
      const ref = db.ref(uid);
      this.getData(ref);
      this.setState({ user, uid, ref });
    });
  }

  getData = (ref) => {
    if (ref) {
      ref.once("value").then((snapshot) => {
        const data = (snapshot.val()) ? snapshot.val() : initData;
        this.setState({ data });
      });
    }
    else {
      this.setState({data: initData});
    }
  }

  handleTab = (e, { name }) => this.setState({ tab: name });

  updateData = () => {
    const { data, ref } = this.state;
    ref.set(data);
    dataToVector(data);
  }

  render() {
    var { data, tab } = this.state;
    if (!data) data = initData;

    // Logged in
    if (this.state.uid) {
      return (
        <div>
          <Menu fixed="top" inverted size="massive">
            <Container>
              <Menu.Item header>HaleAF</Menu.Item>
              <Menu.Item position="right">{this.state.user.displayName}</Menu.Item>
              <Menu.Item onClick={this.logout}>Sign Out</Menu.Item>
            </Container>
          </Menu>
          <Grid stackable centered columns={2} relaxed="very" style={{marginTop:"1em"}}>
            <Grid.Column>
              <Container text>
                <Menu attached='top' tabular inverted size="large">
                  <Menu.Item name="demo" content='Demographics' active={tab === 'demo'} onClick={this.handleTab}/>
                  <Menu.Item name="lifestyle" content='Lifestyle' active={tab === 'lifestyle'} onClick={this.handleTab}/>
                  <Menu.Item name="hist" content='Medical History' active={tab === 'hist'} onClick={this.handleTab}/>
                </Menu>
                {tab === 'demo' &&
                  <Table attached definition>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Age Group
                        </Table.Cell>
                        <Table.Cell>
                          <Select fluid options={age_group} value={data.age_group} 
                            onChange={(e, { value }) => {
                              data.age_group = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Height
                        </Table.Cell>
                        <Table.Cell>
                          <Input fluid value={(data.height_cm < 1) ? "" : data.height_cm} error={isNaN(data.height_cm) || !data.height_cm}
                            label={{ basic: true, content: "cm" }}
                            labelPosition="right"
                            onChange={(e, { value }) => {
                              (value === "") ? data.height_cm = -1 : data.height_cm = Number(value);
                              if (data.height_cm) {
                                this.setState({ data });
                              }
                            }}/>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Weight
                        </Table.Cell>
                        <Table.Cell>
                          <Input fluid value={(data.weight_kg < 1) ? "" : data.weight_kg} error={isNaN(data.weight_kg) || !data.weight_kg}
                            label={{ basic: true, content: "kg" }}
                            labelPosition="right"
                            onChange={(e, { value }) => {
                              (value === "") ? data.weight_kg = -1 : data.weight_kg = Number(value);
                              if (data.weight_kg) {
                                this.setState({ data });
                              }
                            }}/>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Sex
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={sex} value={data.sex} 
                            onChange={(e, { value }) => {
                              data.sex = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>                  
                     <Table.Row>
                        <Table.Cell textAlign="right">
                          Current Marital Status
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={married} value={data.married} 
                            onChange={(e, { value }) => {
                              data.married = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Highest Attained Education Level
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={education} value={data.education} 
                            onChange={(e, { value }) => {
                              data.education = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Current Employment Status
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={employment} value={data.employment} 
                            onChange={(e, { value }) => {
                              data.employment = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Income Level
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={income} value={data.income} 
                            onChange={(e, { value }) => {
                              data.income = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Housing Status
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={own_home} value={data.own_home} 
                            onChange={(e, { value }) => {
                              data.own_home = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Are you a veteran?
                        </Table.Cell>
                        <Table.Cell>
                          <Select fluid options={veteran} value={data.veteran} 
                            onChange={(e, { value }) => {
                              data.veteran = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Ethnicity
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid search options={race} value={data.race} 
                            onChange={(e, { value }) => {
                              data.race = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          State of current residence
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid search options={state} value={data.state} 
                            onChange={(e, { value }) => {
                              data.state = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                }
                {tab === 'lifestyle' &&
                  <Table attached definition>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          How many times were you intoxicated in the last month?
                        </Table.Cell>
                        <Table.Cell>
                          <Input fluid value={(data.alcohol < 0) ? "" : data.alcohol} error={isNaN(data.alcohol)}
                            label={{ basic: true, content: "times" }}
                            labelPosition="right"
                            onChange={(e, { value }) => {
                              (value === "") ? data.alcohol = -1 : data.alcohol = Number(value);
                              if (!isNaN(value)) {
                                this.setState({ data });
                              }
                            }}/>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          How often do you smoke?
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={smoke} value={data.smoke} 
                            onChange={(e, { value }) => {
                              data.smoke = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                }
                {tab === 'hist' &&
                  <Table attached="bottom" definition>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          High Blood Pressure/Hypertension
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={high_blood_pressure} value={data.high_blood_pressure} 
                            onChange={(e, { value }) => {
                              data.high_blood_pressure = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          High Cholesterol
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={high_blood_cholesterol} value={data.high_blood_cholesterol} 
                            onChange={(e, { value }) => {
                              data.high_blood_cholesterol = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Cardiac Arrest/Heart Attack
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={heart_attack} value={data.heart_attack} 
                            onChange={(e, { value }) => {
                              data.heart_attack = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Angina
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={angina} value={data.angina} 
                            onChange={(e, { value }) => {
                              data.angina = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Asthma
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={asthma} value={data.asthma} 
                            onChange={(e, { value }) => {
                              data.asthma = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Skin Cancer/Melanoma
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={skin_cancer} value={data.skin_cancer} 
                            onChange={(e, { value }) => {
                              data.skin_cancer = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Other Cancers
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={other_cancer} value={data.other_cancer} 
                            onChange={(e, { value }) => {
                              data.other_cancer = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell collapsing textAlign="right">
                          Chronic Obstructive Pulmonary Disease (COPD)
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={copd} value={data.copd} 
                            onChange={(e, { value }) => {
                              data.copd = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Arthritis
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={arthritis} value={data.arthritis} 
                            onChange={(e, { value }) => {
                              data.arthritis = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Depression
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={depression} value={data.depression} 
                            onChange={(e, { value }) => {
                              data.depression = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Kidney Diseases
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={kidney_disease} value={data.kidney_disease} 
                            onChange={(e, { value }) => {
                              data.kidney_disease = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell textAlign="right">
                          Diabetes
                        </Table.Cell>
                        <Table.Cell>
                           <Select fluid options={diabetes} value={data.diabetes} 
                            onChange={(e, { value }) => {
                              data.diabetes = value;
                              this.setState({ data });
                            }}
                          />
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                }
              </Container>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Container text textAlign="center">
                <Button primary circular size="massive" onClick={this.updateData} icon="save" content="Save"/>
              </Container>
            </Grid.Column>
          </Grid>
        </div>
      );
    }

    // Logged out - landing page
    else {
      return (
        <div className="Landing">
          <Segment basic textAlign="center" vertical>
            <Header as="h1" content="HaleAF"/>
            <Header as="h2" content="Discover your projected Quality of Life"/>
            <Button primary size="huge" onClick={this.login} animated>
              <Button.Content visible>
                Get Started <Icon name="right arrow"/>
              </Button.Content>
              <Button.Content hidden>
                Sign in with <Icon name="google"/>
              </Button.Content>
            </Button>
          </Segment>
        </div>
      );
    }
  }
}

export default App;
