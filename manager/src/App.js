import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAqcRbNdeHLHndAMChiS-uCUiBr4_17M0M',
      authDomain: 'manager-4c8b5.firebaseapp.com',
      databaseURL: 'https://manager-4c8b5.firebaseio.com',
      projectId: 'manager-4c8b5',
      storageBucket: 'manager-4c8b5.appspot.com',
      messagingSenderId: '59661544407'
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
