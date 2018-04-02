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
import { initData,
         dataToVector,
         age_group,
         sex,
         married,
         education,
         employment,
         income,
         own_home,
         veteran,
         smoke,
         race,
         state,
         high_blood_pressure,
         high_blood_cholesterol,
         heart_attack,
         angina,
         asthma,
         skin_cancer,
         other_cancer,
         copd,
         arthritis,
         depression,
         kidney_disease,
         diabetes } from "../constants"

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
        const data = (snapshot.val() && snapshot.val().data) ? snapshot.val().data : initData;
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
    ref.update({"data": data});
  }

  updateVector = () => {
    const { data, ref } = this.state;
    const vec = dataToVector(data);
    ref.update({"vector": vec});
  }

  predict = () => {
    this.updateData();
    this.updateVector();
    var prediction = "our model died :(";
    this.setState({ prediction });
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
          <Grid stackable centered columns={2} relaxed="very" style={{marginTop:"1em", height:"90vh"}}>
            <Grid.Column stretched verticalAlign="top">
              <Container text>
                <Menu attached='top' inverted size="huge">
                  <Menu.Item name="demo" content='Demographics' active={tab === 'demo'} onClick={this.handleTab}/>
                  <Menu.Item name="lifestyle" content='Lifestyle' active={tab === 'lifestyle'} onClick={this.handleTab}/>
                  <Menu.Item name="hist" content='Medical History' active={tab === 'hist'} onClick={this.handleTab}/>
                  <Menu.Item position="right" active color="blue" onClick={this.updateData} icon="save" content="Save"/>
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
            <Grid.Column stretched verticalAlign="middle">
              <Container text textAlign="center">
                <Segment basic vertical>
                  <Header size="huge" content={this.state.prediction ? this.state.prediction : " "} />
                  <Button primary circular size="massive" onClick={this.predict} content="Get your prediction"/>
                </Segment>
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
            <Header as="h1" content="HaleAF" subheader="Hale /hāl/: strong and healthy."/>
            <Header as="h2" content="Get ready to get hale af at tinyurl.com/haleaf"/>
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
