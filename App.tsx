import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import AppNavigator from './src/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <AppNavigator />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
