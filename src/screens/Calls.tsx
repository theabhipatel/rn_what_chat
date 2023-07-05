import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Calls = () => {
  return (
    <View>
      <View>
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          style={{paddingHorizontal: 15}}
          ListHeaderComponent={() => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: '#128C7E',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../images/link.png')}
                    style={{width: 16, height: 16, tintColor: '#fff'}}
                  />
                </View>
                <View style={{marginLeft: 15}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#000',
                      fontWeight: '500',
                    }}>
                    Create call link
                  </Text>
                  <Text style={{fontSize: 12}}>
                    Share a link for your WhatsChat call
                  </Text>
                </View>
              </View>
              <View style={{marginHorizontal: 8, marginVertical: 10}}>
                <Text>Recent</Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
          renderItem={() => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: '#ccc',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
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
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../images/down-left-arrow.png')}
                      style={{width: 12, height: 12, tintColor: 'red'}}
                    />
                    <Text style={{fontSize: 12}}>Today, 9:33 am</Text>
                  </View>
                </View>
              </View>
              <View>
                <Image
                  source={require('../images/phone-call.png')}
                  style={{width: 16, height: 16, tintColor: '#128C7E'}}
                />
              </View>
            </View>
          )}
          ListFooterComponent={() => (
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
                source={require('../images/lock.png')}
                style={{width: 12, height: 12, tintColor: '#128C7E'}}
              />
              <Text style={{color: '#128C7E', marginLeft: 5}}>
                Your calls are end-to-encripted
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Calls;

const styles = StyleSheet.create({});
