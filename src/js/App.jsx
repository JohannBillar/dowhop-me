// @flow

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Wrapper from './Wrapper';
import SignIn from './SignIn';
import firebase from '../firebase';

class App extends Component {
  state = {
    currentUser: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  render() {
    const currentUser = this.state.currentUser;
    console.log(currentUser);
    return (
      <Wrapper>
        <div>
          {!currentUser && <SignIn />}
        </div>
        {currentUser &&
          <div>
            <p className="text-center">
              Thanks for signing in {currentUser.displayName}
            </p>
            <Button className="pull-right" onClick={() => firebase.auth().signOut()}>
              Sign Out
            </Button>
          </div>}
      </Wrapper>
    );
  }
}

export default App;
