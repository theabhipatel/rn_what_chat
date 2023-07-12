import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../../types';

type IProps = NativeStackScreenProps<IRootStackParamList, 'MyStatus'>;

const MyStatus: FC<IProps> = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {backgroundColor: '#128C7E'},
      headerTitleStyle: {color: '#fff'},
    });
  }, []);

  return (
    <View>
      <Text>MyStatus</Text>
    </View>
  );
};

export default MyStatus;

const styles = StyleSheet.create({});
