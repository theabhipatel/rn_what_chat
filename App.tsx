import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import AppNavigator from './src/AppNavigator';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;
