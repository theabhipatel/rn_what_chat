import React, {useState, useEffect, FC} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../types';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

interface IUser {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

type IProps = NativeStackScreenProps<IRootStackParamList, 'Login'>;

const Login: FC<IProps> = ({navigation}) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '365934165013-d4qpenn0fvjbdd82m8ifdqhiksdqo75g.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await saveUserInfo(userInfo.user);
    } catch (error: any) {
      console.log('----err->', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('---- signin cancled ->', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const saveUserInfo = async (user: IUser) => {
    try {
      const isUser = await checkUser(user.email);
      if (!isUser) {
        const userId = uuid.v4();
        const newUser = await firestore()
          .collection('users')
          .doc(userId.toString())
          .set({
            name: user.name,
            email: user.email,
            photo: user.photo,
            userId,
          });
        if (user.name) {
          await AsyncStorage.setItem('USER_NAME', user.name);
          await AsyncStorage.setItem('USER_EMAIL', user.email);
          await AsyncStorage.setItem('USER_ID', userId.toString());
        }
      }
      navigation.navigate('Tabs');
    } catch (error) {
      console.log(error);
    }
  };

  const checkUser = async (email: string) => {
    return firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        return res?.docs[0]?.data();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headText2}>Singin With your Account</Text>
      <View style={styles.box}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.headText}>WhatChat</Text>
        </View>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text style={styles.descText}>Sign in with Google</Text>
          <TouchableOpacity onPress={signIn} style={styles.button}>
            <Image
              source={require('../images/google.png')}
              style={{width: 25, height: 25}}
            />
            <Text style={styles.loginText}>Login / Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    height: 200,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headText: {
    fontSize: 30,
    color: '#c1c1c1',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headText2: {
    fontSize: 20,
    color: '#000',
    fontWeight: '400',
    letterSpacing: 1,
    marginBottom: 10,
  },
  descText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  button: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'blue',
    paddingHorizontal: 35,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // elevation: 5,
  },
  loginText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
