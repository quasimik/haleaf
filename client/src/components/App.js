import React, { Component } from 'react';
import './App.css';
import { db, auth, provider } from '../firebase';

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
    return (
      <div className="App">
        {this.state.uid ?
          <button onClick={this.logout}>Sign Out</button>
          : <button className = "App-header" onClick={this.login}>Sign in with Google</button>
        }
      </div>
    );
  }
}

export default App;
