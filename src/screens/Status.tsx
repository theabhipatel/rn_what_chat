import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';

const Status = () => {
  return (
    <View style={{flex: 1, paddingHorizontal: 8, paddingTop: 8}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              source={require('../images/plus.png')}
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

      <View>
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1]}
          ItemSeparatorComponent={() => <View style={{marginVertical: 4}} />}
          renderItem={() => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 1.8,
                  borderColor: '#128C7E',
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
                <Text style={{fontSize: 16, color: '#000', fontWeight: '500'}}>
                  Game ji
                </Text>
                <Text style={{fontSize: 12}}>43 minutes ago</Text>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View>
              <View style={{marginVertical: 10}}>
                <Text>Viewed updates</Text>
              </View>

              <View>
                <FlatList
                  data={[1, 1, 1, 1, 1, 1, 1]}
                  ItemSeparatorComponent={() => (
                    <View style={{marginVertical: 4}} />
                  )}
                  renderItem={() => (
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
                  )}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({});
