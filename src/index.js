import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';

import './config/ReactotronConfig';
import CodePush from 'react-native-code-push';
import App from './App';
import { store, persistor } from './store';

class Index extends Component {
  constructor(props) {
    super(props);
    OneSignal.init('425daa4a-15c5-4660-b180-06c74b200ce9');
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = data =>{}

  onOpened = notification =>{}

  onIds = id =>{}

a

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#22202c" />
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(Index);
