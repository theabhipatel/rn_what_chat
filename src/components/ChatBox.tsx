import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const ChatBox = ({user}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Chat', {name: user.name, photo: user.photo})
      }
      style={styles.box}>
      <View
        style={{
          height: 40,
          width: 40,
          backgroundColor: '#111',
          borderRadius: 20,
        }}></View>
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
