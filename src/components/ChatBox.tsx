import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {IRootStackParamList, IUser} from '../types';

const ChatBox = ({user, id}: {user: IUser; id: string}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat', {id, data: user})}
      style={styles.box}>
      <View
        style={{
          height: 40,
          width: 40,

          borderRadius: 20,
        }}>
        <Image
          source={{uri: user.photo}}
          style={{width: 40, height: 40, borderRadius: 20}}
        />
      </View>
      <View>
        <Text style={styles.nameText}>{user.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatBox;

const styles = StyleSheet.create({
  box: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#CCC',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginVertical: 2,
    borderRadius: 3,
  },
  nameText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
});
