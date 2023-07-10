import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import StatusHeader from './components/StatusHeader';
import StatusNotSeen from './components/StatusNotSeen';
import StatusSeen from './components/StatusSeen';
import StatusFooter from './components/StatusFooter';
import SelectCameraOrGalleryModal from '../chat/components/SelectCameraOrGalleryModal';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Status = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePath, setImagePath] = useState<string | undefined>('');
  const [userInfo, setUserInfo] = useState({
    email: '',
    photo: '',
  });
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = useCallback(async () => {
    const email = await AsyncStorage.getItem('USER_EMAIL');
    const photo = await AsyncStorage.getItem('USER_PHOTO');
    console.log('----- photo - ------>', photo);

    if (email && photo) {
      setUserInfo({email, photo});
    }
  }, []);

  const uploadImage = useCallback(async () => {
    if (imagePath) {
      const newFileName = Date.now().toString();
      const reference = storage().ref(newFileName);
      const pathToFile = imagePath;
      await reference.putFile(pathToFile);
      let imageUrl = await storage().ref(newFileName).getDownloadURL();
      setImageUrl(imageUrl);
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
      </View>
      <SelectCameraOrGalleryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setImagePath={setImagePath}
        width="95%"
      />
    </View>
  );
};

export default Status;

const styles = StyleSheet.create({});
