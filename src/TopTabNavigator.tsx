import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from './screens/Home';
import Status from './screens/Status';
import Calls from './screens/Calls';
import {IRootTabParamList} from './types';
import Profile from './screens/Profile';

const Tab = createMaterialTopTabNavigator<IRootTabParamList>();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{}} />
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Calls" component={Profile} />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;

const styles = StyleSheet.create({});
