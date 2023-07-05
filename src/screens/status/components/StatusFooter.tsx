import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StatusFooter = () => {
  return (
    <View
      style={{
        marginBottom: 50,
        marginTop: 20,
        borderTopWidth: 0.51,
        borderColor: '#ddd',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../../images/lock.png')}
        style={{width: 12, height: 12, tintColor: '#128C7E'}}
      />
      <Text style={{color: '#128C7E', marginLeft: 5}}>
        Your status upadates are end-to-encripted
      </Text>
    </View>
  );
};

export default StatusFooter;

const styles = StyleSheet.create({});
