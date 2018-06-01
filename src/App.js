import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers';

class App extends Component {

  componentWillMount() {
    //Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyCOzJwZ_YO877GXum_8GY4KZ5ja0z6ul40",
      authDomain: "whatsapp-clone-7e7ac.firebaseapp.com",
      databaseURL: "https://whatsapp-clone-7e7ac.firebaseio.com",
      projectId: "whatsapp-clone-7e7ac",
      storageBucket: "whatsapp-clone-7e7ac.appspot.com",
      messagingSenderId: "119241188632"
    });
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
