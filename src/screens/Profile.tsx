import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

const Profile = ({}) => {
  const navigation = useNavigation();
  const signOut = async () => {
    await GoogleSignin.signOut();
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
