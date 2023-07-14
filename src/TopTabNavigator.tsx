import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from './screens/Home';
import Status from './screens/status/Status';
import Calls from './screens/Calls';
import {IRootTabParamList} from './types';

const Tab = createMaterialTopTabNavigator<IRootTabParamList>();

const TopTabNavigator = () => {
  // #075E54 and #128C7E, and the app background color has a hex value of #ECE5DD, '#0e806a'
  return (
    <>
      <StatusBar backgroundColor={'#128C7E'} />

      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={() => ({
          tabBarActiveTintColor: '#fff',

          tabBarIndicatorStyle: {
            backgroundColor: '#fff',
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
          tabBarStyle: {
            backgroundColor: '#128C7E',
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{tabBarLabel: 'Chats'}}
        />
        <Tab.Screen name="Status" component={Status} />
        <Tab.Screen name="Calls" component={Calls} />
      </Tab.Navigator>
    </>
  );
};

export default TopTabNavigator;
