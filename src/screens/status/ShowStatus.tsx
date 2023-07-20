import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  useWindowDimensions,
} from 'react-native';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../../types';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/Loader';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Animated from 'react-native-reanimated';

type IProps = NativeStackScreenProps<IRootStackParamList, 'ShowStatus'>;
export interface IStatusData {
  userId: string;
  userName: string;
  userPhoto: string;
  caption: string;
  contentType: string;
  createdAt: number;
  mediaLink: string;
  isFinished: number;
}

const ShowStatus: FC<IProps> = ({navigation, route}) => {
  const [statusData, setStatusData] = useState<IStatusData[]>([]);
  const [current, setCurrent] = useState(0);
  const [isVideoLoad, setIsVideoLoad] = useState(false);
  const [videoLenth, setVideoLength] = useState(0);
  const {width, height} = useWindowDimensions();
  const [currentUserId, setCurrentUserId] = useState<string>();

  useEffect(() => {
    getUserCurrentUserId();
    getStatusData();
  }, []);

  const getUserCurrentUserId = useCallback(async () => {
    const userId = await AsyncStorage.getItem('USER_ID');
    if (userId) {
      setCurrentUserId(userId);
    }
  }, []);

  const getStatusData = () => {
    const statusRef = firestore()
      .collection('status')
      .where('userId', '==', route.params?.userId);

    statusRef
      .get()
      .then(res => {
        const data = res.docs.map(doc => doc.data() as IStatusData);
        const sortedData = data.sort((a, b) => a.createdAt - b.createdAt);
        setStatusData(sortedData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  /** ---------> logic for top status progress bar <------- */
  const progress = useRef(new Animated.Value(0)).current;
  // console.log('----- statusData[current] ---', statusData[current]);

  const startAnimation = (length?: any) => {
    if (statusData[current].contentType.includes('video')) {
      if (isVideoLoad) {
        Animated.timing(progress, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: false,
        }).start(({finished}) => {
          if (finished) {
            handleNextStatus();
          }
        });
      }
    } else {
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(({finished}) => {
        if (finished) {
          handleNextStatus();
        }
      });
    }
  };

  const handleNextStatus = () => {
    if (current !== statusData.length - 1) {
      let tempData = statusData;
      tempData[current].isFinished = 1;
      setStatusData(tempData);
      progress.setValue(0);
      setCurrent(prev => prev + 1);
    } else {
      progress.setValue(0);
      navigation.goBack();
    }
  };

  const handlePrevStatus = () => {
    if (current > 0) {
      let tempData = statusData;
      tempData[current - 1].isFinished = 0;
      setStatusData(tempData);
      progress.setValue(0);
      setCurrent(prev => prev - 1);
    } else {
      setCurrent(0);
      progress.setValue(0);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar backgroundColor={'#000'} barStyle={'dark-content'} />
      {/* ---------> Header <------------  */}
      <View
        style={{
          position: 'absolute',
          paddingTop: 5,
          width: '100%',
          zIndex: 1,
          paddingVertical: 10,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {statusData.map((item, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                height: 2,
                backgroundColor: '#aaa',
                margin: 2.5,
                flexDirection: 'row',
              }}>
              <Animated.View
                style={{
                  flex:
                    current === index ? progress : statusData[index].isFinished,
                  height: 2.5,
                  backgroundColor: '#128C7E',
                }}></Animated.View>
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 8,
            paddingHorizontal: 10,
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
                {currentUserId == route.params.userId
                  ? 'My Status'
                  : route.params.userName}
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
        </View>
      </View>
      {/* ---------> Showing Status here <------------  */}
      <View style={{width, height}}>
        {/* {statusData[current]?.mediaLink && (
          <Image
            onLoadEnd={() => {
              progress.setValue(0);
              startAnimation();
            }}
            source={{uri: statusData[current].mediaLink}}
            style={{height, width, resizeMode: 'contain'}}
          />
        )} */}
        {statusData[current]?.mediaLink ? (
          statusData[current].contentType.includes('image/') ? (
            <Image
              onLoadEnd={() => {
                progress.setValue(0);
                startAnimation();
              }}
              source={{uri: statusData[current].mediaLink}}
              style={{height, width, resizeMode: 'contain'}}
            />
          ) : (
            <Video
              source={{uri: statusData[current].mediaLink}}
              paused={false}
              onReadyForDisplay={() => startAnimation(videoLenth)}
              onLoad={() => {
                setIsVideoLoad(true);
                startAnimation();
              }}
              resizeMode="contain"
              style={{height, width}}
            />
          )
        ) : (
          <Loader isLoading />
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
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 100,
            backgroundColor: 'rgba(0,0,0,0.6)',
            alignItems: 'center',
            padding: 5,
          }}>
          <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
            {statusData[current]?.caption}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ShowStatus;

const styles = StyleSheet.create({});
