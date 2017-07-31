// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FirebaseUIAuth from './FirebaseUIAuth';
import firebase, { ui } from '../firebase';
import appAuth from './appAuth';

class Login extends Component {
  state = {
    redirectToReferrer: false
  };

  uiConfig = {
    callbacks: {
      signInSuccess: () => {
        this.login();
        return false;
      }
    },
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };

  login = () => {
    appAuth.authenticate();
    this.setState({ redirectToReferrer: true });
  };

  props: {
    location: string
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p className="text-center">
          You must be logged in to view the page at {from.pathname}
          <pre>
            <code>
              {JSON.stringify(from, null, 4)}
            </code>
          </pre>
        </p>
        <FirebaseUIAuth ui={ui} {...this.uiConfig} />
      </div>
    );
  }
}

export default Login;