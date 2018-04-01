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
