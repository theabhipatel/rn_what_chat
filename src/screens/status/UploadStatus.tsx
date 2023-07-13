import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../../types';
import uploadFile from '../../utils/uploadFile';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';

type IPorps = NativeStackScreenProps<IRootStackParamList, 'UploadStatus'>;

const UploadStatus: FC<IPorps> = ({navigation, route}) => {
  const assets = route.params.data.assets;
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState('');
  const [userInfo, setUserInfo] = useState({
    email: '',
    photo: '',
    userId: '',
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = useCallback(async () => {
    const email = await AsyncStorage.getItem('USER_EMAIL');
    const photo = await AsyncStorage.getItem('USER_PHOTO');
    const userId = await AsyncStorage.getItem('USER_ID');
    // console.log('----- photo - ------>', photo);

    if (email && photo && userId) {
      setUserInfo({email, photo, userId});
    }
  }, []);

  const updateStatus = useCallback(async () => {
    setIsLoading(true);
    let imageUrl;
    if (assets) {
      if (assets[0].fileName && assets[0].uri) {
        imageUrl = await uploadFile(assets[0].fileName, assets[0].uri);
      }
      firestore()
        .collection('status')
        .doc('' + userInfo.userId)
        .collection('ones-status')
        .add({
          caption,
          createdAt: Date.now(),
          mediaLink: imageUrl,
          contentType: assets[0].type,
          isFinished: 0,
        })
        .then(res => {
          console.log('----- res ---', res);
          setIsLoading(false);
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [caption]);

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar hidden />
      <View
        style={{
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 20,
          width: '100%',
          zIndex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../images/close.png')}
              style={{width: 14, height: 14, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '45%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Image
              source={require('../../images/crop.png')}
              style={{width: 18, height: 18, tintColor: '#fff'}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../images/sticker.png')}
              style={{width: 18, height: 18, tintColor: '#fff'}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../images/t.png')}
              style={{width: 12, height: 12, tintColor: '#fff'}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../images/pencil.png')}
              style={{width: 14, height: 14, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: '100%',
          width: '100%',
        }}>
        <View>
          {route.params?.data.assets && (
            <Image
              source={{uri: route.params.data.assets[0].uri}}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          )}
        </View>
      </View>
      {/* -------------->> bottom view <<-------------- */}
      <View style={{position: 'absolute', width: '100%', bottom: 10}}>
        <View
          style={{
            height: 42,
            backgroundColor: '#192734',
            borderRadius: 30,
            marginHorizontal: 8,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Image
            source={require('../../images/image.png')}
            style={{width: 18, height: 18, tintColor: '#fff'}}
          />
          <TextInput
            placeholder="Add a caption..."
            onChangeText={txt => setCaption(txt)}
            placeholderTextColor={'#fff'}
            style={{marginLeft: 8, fontSize: 15, color: '#fff'}}
          />
        </View>

        <View
          style={{
            marginTop: 8,
            paddingTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 8,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              height: 28,
              backgroundColor: '#192734',
              borderRadius: 30,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Image
              source={require('../../images/story.png')}
              style={{width: 16, height: 16, tintColor: '#fff'}}
            />
            <Text style={{marginLeft: 8, color: '#fff'}}>
              Status (10 included)
            </Text>
          </View>
          <TouchableOpacity onPress={updateStatus}>
            <View
              style={{
                padding: 12,
                backgroundColor: '#128C7E',
                borderRadius: 30,
              }}>
              <Image
                source={require('../../images/send.png')}
                style={{width: 18, height: 18, tintColor: '#fff'}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Loader isLoading={isLoading} title="Status Updating ..." />
    </View>
  );
};

export default UploadStatus;

////  ===== colors    ======
//  #075E54, #128C7E, and #25D366.23 The WhatsApp background color scheme consists of #075e54, #128c7e, #25d366, #dcf8c6, #34b7f1, and #ece5dd, #0fb0f1, #EDF8F5 , #075E54, #192734
