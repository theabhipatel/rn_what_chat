import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StatusSeen = () => {
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 1.8,
            borderColor: '#bbb',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '95%',
              height: '95%',
              borderRadius: 20,
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
          <Text style={{fontSize: 12}}>43 minutes ago</Text>
        </View>
      </View>
    </View>
  );
};

export default StatusSeen;

const styles = StyleSheet.create({});
