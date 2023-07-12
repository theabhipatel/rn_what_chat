import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../../types';
import firestore from '@react-native-firebase/firestore';

type IProps = NativeStackScreenProps<IRootStackParamList, 'ShowStatus'>;
interface IStatusData {
  caption: string;
  contentType: string;
  createdAt: number;
  mediaLink: string;
}

const ShowStatus: FC<IProps> = ({navigation, route}) => {
  const [statusData, setStatusData] = useState<IStatusData[]>([]);
  const [current, setCurrent] = useState(0);
  const {width, height} = useWindowDimensions();

  console.log('--------  current --------', current);

  useEffect(() => {
    getStatusData();
  }, []);

  const getStatusData = () => {
    const chatRef = firestore()
      .collection('status')
      .doc(route.params?.userId)
      .collection('ones-status')
      .orderBy('createdAt', 'desc');

    chatRef
      .get()
      .then(res => {
        const data = res.docs.map(doc => doc.data() as IStatusData);
        setStatusData(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handlePrevStatus = () => {
    current > 0 ? setCurrent(prev => prev - 1) : setCurrent(0);
  };
  const handleNextStatus = () => {
    if (current !== statusData.length - 1) {
      setCurrent(prev => prev + 1);
    }
    // else {
    //   setCurrent(statusData.length);
    // }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar backgroundColor={'#000'} />
      {/* ---------> Header <------------  */}
      {/* <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../images/back.png')}
              style={{width: 20, height: 20, tintColor: '#fff'}}
            />
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 20,
              marginLeft: 10,
            }}>
            {route.params?.photo && (
              <Image
                source={{uri: route.params.photo}}
                style={{width: 35, height: 35, borderRadius: 20}}
              />
            )}
          </View>
          <View style={{marginLeft: 16}}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>
              My Status
            </Text>
            <Text style={{color: '#fff', fontSize: 10, fontWeight: '500'}}>
              Today, 3:45 pm
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={require('../../images/dots.png')}
            style={{width: 22, height: 22, tintColor: '#fff'}}
          />
        </View>
      </View> */}
      {/* ---------> Showing Status here <------------  */}
      <View style={{width, height}}>
        {statusData[current]?.mediaLink && (
          <Image
            source={{uri: statusData[current].mediaLink}}
            style={{height, width, resizeMode: 'contain'}}
          />
        )}
        <View
          style={{
            width,
            height,
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={handlePrevStatus}
            style={{
              width: '40%',
              height: '100%',
            }}></TouchableOpacity>
          <TouchableOpacity
            onPress={handleNextStatus}
            style={{
              width: '40%',
              height: '100%',
            }}></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShowStatus;

const styles = StyleSheet.create({});
