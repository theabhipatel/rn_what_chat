import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../types';
type IProps = NativeStackScreenProps<IRootStackParamList, 'Profile'>;
const Profile: FC<IProps> = ({navigation}) => {
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
