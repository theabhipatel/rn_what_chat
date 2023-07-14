import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../../types';
import Video from 'react-native-video';

type IProps = NativeStackScreenProps<IRootStackParamList, 'MyStatus'>;

const MyStatus: FC<IProps> = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View
          style={{
            flexDirection: 'row',
            padding: 12,
            backgroundColor: '#128C7E',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../images/back.png')}
              style={{width: 20, height: 20, tintColor: '#fff'}}
            />
          </TouchableOpacity>
          <Text style={{marginLeft: 20, color: '#eee', fontSize: 16}}>
            My status
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={{padding: 10}}>
      {route.params?.statusData?.map((item, index) => (
        <TouchableOpacity key={index}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ShowStatus', {
                    userId: route.params?.userId,
                    photo: route.params?.photo,
                  })
                }
                style={{flexDirection: 'row'}}>
                {item.contentType.includes('image') ? (
                  <Image
                    source={{uri: item.mediaLink}}
                    style={{width: 45, height: 45, borderRadius: 30}}
                  />
                ) : (
                  <View
                    style={{
                      width: 45,
                      height: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#ccc',
                      borderRadius: 30,
                    }}>
                    <Image
                      source={require('../../images/video-camera.png')}
                      style={{width: 25, height: 25, borderRadius: 30}}
                    />
                  </View>
                )}

                <View style={{marginLeft: 20}}>
                  <Text>0 views</Text>
                  <Text>3 minutes ago</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{padding: 10, borderRadius: 20}}>
              <Image
                source={require('../../images/dots.png')}
                style={{width: 20, height: 20, tintColor: '#000'}}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MyStatus;

const styles = StyleSheet.create({});
