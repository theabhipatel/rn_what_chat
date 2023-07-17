import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import StatusHeader from './components/StatusHeader';
import StatusNotSeen from './components/StatusNotSeen';
import StatusSeen from './components/StatusSeen';
import StatusFooter from './components/StatusFooter';
import SelectCameraOrGalleryModal from '../chat/components/SelectCameraOrGalleryModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ImagePickerResponse} from 'react-native-image-picker';
import uploadFile from '../../utils/uploadFile';
import OpenCameraOrGalleryModal from './components/OpenCameraOrGalleryModal';
import {IStatusData} from './ShowStatus';
import firestore from '@react-native-firebase/firestore';

export interface IUserInfo {
  email: string;
  photo: string;
  userId: string;
}

const Status = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageData, setImageData] = useState<ImagePickerResponse>({});
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    email: '',
    photo: '',
    userId: '',
  });
  const [statusData, setStatusData] = useState<IStatusData[]>([]);

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

  /** fetching status data here -----> */
  // console.log('------ status data --->', statusData);
  useEffect(() => {
    // getStatusData();
  }, []);

  const getStatusData = () => {
    const statusRef = firestore()
      .collection('status')
      .doc()
      .collection('ones-status')
      .orderBy('createdAt', 'desc');

    statusRef
      .get()
      .then(res => {
        if (!res.empty) {
          const data = res.docs.map(doc => doc.data() as IStatusData);
          setStatusData(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={statusData}
          style={{paddingHorizontal: 15}}
          ListHeaderComponent={() => (
            <StatusHeader
              setIsModalOpen={setIsModalOpen}
              photo={userInfo.photo}
              userId={userInfo.userId}
            />
          )}
          ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
          renderItem={({item}) => <StatusNotSeen item={item} />}
          ListFooterComponent={() => (
            <View>
              <View style={{marginVertical: 10}}>
                <Text>Viewed updates</Text>
              </View>

              <View>
                <FlatList
                  data={[1, 1, 1, 1, 1, 1, 1]}
                  ItemSeparatorComponent={() => (
                    <View style={{marginVertical: 8}} />
                  )}
                  renderItem={() => <StatusSeen />}
                  ListFooterComponent={() => <StatusFooter />}
                />
              </View>
            </View>
          )}
        />
        <TouchableOpacity onPress={() => setIsModalOpen(true)}>
          <View
            style={{
              position: 'absolute',
              bottom: 20,
              right: 18,
              padding: 10,
              backgroundColor: '#128C7E',
              borderRadius: 30,
            }}>
            <Image
              source={require('../../images/camera.png')}
              style={{width: 30, height: 30, tintColor: '#fff'}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <OpenCameraOrGalleryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setImageData={setImageData}
      />
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({});
