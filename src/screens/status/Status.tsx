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

  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1]}
          style={{paddingHorizontal: 15}}
          ListHeaderComponent={() => (
            <StatusHeader
              setIsModalOpen={setIsModalOpen}
              photo={userInfo.photo}
              userId={userInfo.userId}
            />
          )}
          ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
          renderItem={() => <StatusNotSeen />}
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
              bottom: 16,
              right: 10,
              padding: 10,
              backgroundColor: '#128C7E',
              borderRadius: 20,
            }}>
            <Image
              source={require('../../images/camera.png')}
              style={{width: 20, height: 20, tintColor: '#fff'}}
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
