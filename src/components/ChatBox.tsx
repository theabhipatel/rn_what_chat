import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {IRootStackParamList, IUser} from '../types';

const ChatBox = ({user, id}: {user: IUser; id: string | undefined}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate('Chat', {id, data: user})}
      style={styles.box}>
      <View
        style={{
          height: 48,
          width: 48,
          borderRadius: 25,
        }}>
        <Image
          source={{uri: user.photo}}
          style={{width: 48, height: 48, borderRadius: 25}}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    borderRadius: 3,
  },
  nameText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
});
