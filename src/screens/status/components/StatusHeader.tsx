import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StatusHeader = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 8,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#ccc',
          }}>
          {/* <Image source={} /> */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: 22,
              width: 22,
              backgroundColor: '#128C7E',
              borderRadius: 11,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#fff',
            }}>
            <Image
              source={require('../../../images/plus.png')}
              style={{width: 10, height: 10, tintColor: '#fff'}}
            />
          </View>
        </View>
        <View style={{marginLeft: 15}}>
          <Text style={{fontSize: 16, color: '#000', fontWeight: '500'}}>
            My status
          </Text>
          <Text style={{fontSize: 12, color: '#aaa'}}>
            Tap to add status update
          </Text>
        </View>
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={{color: '#aaa'}}>Recent updates</Text>
      </View>
    </View>
  );
};

export default StatusHeader;

const styles = StyleSheet.create({});
