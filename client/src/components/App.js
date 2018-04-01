import React, { Component } from "react";
import "./App.css";
import { db, auth, provider } from "../firebase";
import { Header, Button, Segment, Icon, Container, Grid, Menu, Input, Select, Table } from "semantic-ui-react";

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      uid: null,
      ref: null,
      data: null
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
    ref.once("value").then((snapshot) => {
      const data = (snapshot.val() && snapshot.val().data) || {};
      this.setState({ data });
    });
  }

  render() {

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
    
    const marriage = [
      {value: -1, text: "Select"},
      {value: 1, text: "Married"},
      {value: 2, text: "Divorced"},
      {value: 3, text: "Widowed"},
      {value: 4, text: "Separated"},
      {value: 5, text: "Never married"},
      {value: 6, text: "Engaged"},
    ];
    
    const engaged = [
      {value: -1, text: "Select"},
      {value: 1, text: "Kindergarten or below"},
      {value: 2, text: "Elementary"},
      {value: 3, text: "Middle school"},
      {value: 4, text: "High school"},
      {value: 5, text: "Bachlor"},
      {value: 6, text: "Graduate"},
    ];
    
    const employment - [
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
    ]
    
    const veteran = [
      {value: -1, text: "Select"},
      {value: 1, text: "Yes"},
      {value: 2, text: "No"},
    ]
    
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
    ]
    
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
      {value: 11 text: "District of Columnbia"},
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
    
    const high_bp = [
      {value: -1, text: "Select"},
      {value: 1, text: "Normally"},
      {value: 2, text: "When pregnant"},
      {value: 3, text: "No"},
      {value: 4, text: "No, but close"},
    ];
    
    // High Chol, Heart Attack, Angina, Asthma, Skin_Cancer, Other, Chronic Obstructive Pulmonary Disease, Arthritis, Depression, Kidney Disease are Yes/No
    
    const diabetes = [
      {value: -1, text: "Select"},
      {value: 1, text: "Yes"},
      {value, 2, text: "Only when pregnant"},
      {value, 3, text: "No"},
      {value, 4, text: "No, but at risk"},
    ];

    
    // Logged in
    if (this.state.uid) {
      return (
        <div>
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item header>HaleAF</Menu.Item>
              <Menu.Item position="right">{this.state.user.displayName}</Menu.Item>
              <Menu.Item onClick={this.logout}>Sign Out</Menu.Item>
            </Container>
          </Menu>
          <Grid stackable centered columns={2} relaxed="very" style={{marginTop:"1em"}}>
            <Grid.Column>
              <Container text>
                <Table definition>
                  <Table.Row>
                    <Table.Cell>
                      Age Group: 
                    </Table.Cell>
                    <Table.Cell>
                      <Select fluid options={age_group} placeholder="Select"/>
                    </Table.Cell>
                  </Table.Row>
                </Table>
              </Container>
            </Grid.Column>
            <Grid.Column stretched>
              {this.state.uid}
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
            <Header as="h2" content="Our pitch goes here???"/>
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
