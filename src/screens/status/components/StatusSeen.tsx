import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StatusSeen = () => {
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 1.8,
            borderColor: '#bbb',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '92%',
              height: '92%',
              borderRadius: 25,
              backgroundColor: '#ccc',
            }}></View>
          {/* <Image source={} /> */}
        </View>
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
              fontWeight: '500',
            }}>
            Game ji
          </Text>
          <Text style={{fontSize: 12, color: '#aaa'}}>43 minutes ago</Text>
        </View>
      </View>
    </View>
  );
};

export default StatusSeen;

const styles = StyleSheet.create({});
