import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../types';

type IProps = NativeStackScreenProps<IRootStackParamList, 'Chat'>;

const Chat: FC<IProps> = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: route.params?.photo}}
                style={{width: 30, height: 30, borderRadius: 15}}
              />
            </TouchableOpacity>
            <Image
              source={{uri: route.params?.photo}}
              style={{width: 30, height: 30, borderRadius: 15}}
            />
            <Text style={{marginLeft: 5, fontSize: 20, fontWeight: '500'}}>
              {route.params?.name}
            </Text>
          </View>
        );
      },
      // headerTitle:
    });
  }, [navigation]);
  return <View>{/* <Text>{route.params?.name}</Text> */}</View>;
};

export default Chat;

const styles = StyleSheet.create({});
