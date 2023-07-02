import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './screens/Splash';
import {IRootStackParamList} from './types';
import Login from './screens/Login';
import Home from './screens/Home';
import TopTabNavigator from './TopTabNavigator';
import Profile from './screens/Profile';
import Chat from './screens/Chat';

const Stack = createNativeStackNavigator<IRootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false, animation: 'simple_push'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Tabs"
          component={TopTabNavigator}
          options={{
            headerShown: true,
            title: 'WhatsChat',
            headerRight: () => (
              <TouchableOpacity>
                <Image
                  source={require('./images/dots.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            ),

            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
