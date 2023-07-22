import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
type IProps = NativeStackScreenProps<IRootStackParamList, 'Profile'>;
const Profile: FC<IProps> = ({navigation}) => {
  const signOut = async () => {
    GoogleSignin.signOut()
      .then(res => {
        console.log(' G signout res ------->', res);
      })
      .catch(error => {
        console.log(' G signout error ------->', error);
      });
    await AsyncStorage.removeItem('USER_NAME');
    await AsyncStorage.removeItem('USER_EMAIL');
    await AsyncStorage.removeItem('USER_PHOTO');
    await AsyncStorage.removeItem('USER_ID');
    navigation.navigate('Login');
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{borderColor: 'blue', borderWidth: 1, padding: 10}}
        onPress={signOut}>
        Sign out
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
