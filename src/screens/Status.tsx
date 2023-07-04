import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Status = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>Status</Text>
      <Text>Currently unavailable</Text>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({});
