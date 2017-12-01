import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyADx3rJ7emmlx-M_4EcxBbhPC0OiochEmA',
      authDomain: 'authentication-e7239.firebaseapp.com',
      databaseURL: 'https://authentication-e7239.firebaseio.com',
      projectId: 'authentication-e7239',
      storageBucket: 'authentication-e7239.appspot.com',
      messagingSenderId: '186354929690',
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    const { logoutViewStyle, spinnerViewStyle } = styles;
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={logoutViewStyle}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={spinnerViewStyle}>
            <Spinner />
          </View>
        );
    }
  }

  render() {
    return (
      <View style={styles.containerstyle}>
        <Header title="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  logoutViewStyle: {
    position: 'relative',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
  },
  spinnerViewStyle: {
    flex: 1,
  },
  containerstyle: {
    flex: 1,
  },
};

export default App;
