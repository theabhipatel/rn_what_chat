import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from './src/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  // useEffect(() => {
  //   // SplashScreen.hide();
  // }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <AppNavigator />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
