import 'react-native-gesture-handler';
import React from 'react';
import { useFonts } from 'expo-font'
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { Inter_400Regular, Inter_500Medium, Inter_700Bold} from '@expo-google-fonts/inter'
import AppLoading from 'expo-app-loading'

import { Background } from './src/components/Background/index'
import store from './src/store/index'
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });

  if (!fontsLoaded) return <AppLoading />

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
