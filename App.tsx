import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import { Background } from './src/components/Background/index'
import store from './src/store/index'
import { Routes } from './src/routes';

export default function App() {

  return (
    <Provider store={store}>
      <Background>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <Routes />
      </Background>
    </Provider>
  );
}
