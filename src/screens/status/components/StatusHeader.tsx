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
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#ccc',
          }}>
          {/* <Image source={} /> */}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: 16,
              width: 16,
              backgroundColor: '#128C7E',
              borderRadius: 8,
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
          <Text style={{fontSize: 12}}>Tap to add status update</Text>
        </View>
      </View>
      <View style={{marginVertical: 10}}>
        <Text>Recent updates</Text>
      </View>
    </View>
  );
};

export default StatusHeader;

const styles = StyleSheet.create({});
