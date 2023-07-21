import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
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
import {useIsFocused} from '@react-navigation/native';

export interface IUserInfo {
  name: string;
  email: string;
  photo: string;
  userId: string;
}

const Status = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [imageData, setImageData] = useState<ImagePickerResponse>({});
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: '',
    email: '',
    photo: '',
    userId: '',
  });
  const [statusData, setStatusData] = useState<IStatusData[]>([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = useCallback(async () => {
    const name = await AsyncStorage.getItem('USER_NAME');
    const email = await AsyncStorage.getItem('USER_EMAIL');
    const photo = await AsyncStorage.getItem('USER_PHOTO');
    const userId = await AsyncStorage.getItem('USER_ID');
    // console.log('----- photo - ------>', photo);

    if (name && email && photo && userId) {
      setUserInfo({name, email, photo, userId});
    }
  }, []);

  /** fetching status data here -----> */

  useEffect(() => {
    getStatusData();
  }, [userInfo]);

  const getStatusData = () => {
    if (userInfo.userId) {
      const statusRef = firestore()
        .collection('status')
        .where('userId', '!=', userInfo.userId);

      statusRef
        .get()
        .then(res => {
          if (!res.empty) {
            const data = res.docs.map(doc => doc.data() as IStatusData);

            const uniqueUsers = new Set();
            const oneUserStatus: IStatusData[] = [];
            data.map(item => {
              if (!uniqueUsers.has(item.userId)) {
                uniqueUsers.add(item.userId);
                oneUserStatus.push(item);
              }
            });
            // console.log('-------- oneUserStatus ----->', oneUserStatus);

            setStatusData(oneUserStatus);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getStatusData();
    setRefreshing(false);
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={statusData}
          style={{paddingHorizontal: 15}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListHeaderComponent={() => (
            <StatusHeader
              setIsModalOpen={setIsModalOpen}
              photo={userInfo.photo}
              userId={userInfo.userId}
              userName={userInfo.name}
            />
          )}
          ItemSeparatorComponent={() => <View style={{marginVertical: 8}} />}
          renderItem={({item}) => <StatusNotSeen item={item} />}
          ListEmptyComponent={
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 12, color: '#010101'}}>
                No recent updates
              </Text>
            </View>
          }
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

export default memo(Status);

const styles = StyleSheet.create({});
