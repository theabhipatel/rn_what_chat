import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type IProps = NativeStackScreenProps<IRootStackParamList, 'Splash'>;

const Splash: FC<IProps> = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn();
    }, 2000);
  }, []);
  const isLoggedIn = async () => {
    const user = await AsyncStorage.getItem('USER_EMAIL');
    if (user) {
      navigation.replace('Tabs');
    } else {
      navigation.replace('Login');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>WhatChat</Text>
      <Text style={styles.descText}>welcomes you</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  descText: {
    fontSize: 20,
    color: '#fff',
    letterSpacing: 4,
  },
});
