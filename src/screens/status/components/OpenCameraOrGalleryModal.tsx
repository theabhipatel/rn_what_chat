import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import requestCameraPermission from '../../../utils/requestCameraPermission';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IRootStackParamList} from '../../../types';

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setImageData: Dispatch<SetStateAction<ImagePickerResponse>>;
}
type NavigationPropType = NavigationProp<IRootStackParamList>;

const OpenCameraOrGalleryModal: FC<IProps> = ({
  isModalOpen,
  setIsModalOpen,
  setImageData,
}) => {
  const navigation = useNavigation<NavigationPropType>();
  const takePhotoFromCamera = async () => {
    const granted = await requestCameraPermission();
    if (granted) {
      const result = await launchCamera({mediaType: 'mixed', quality: 0.7});
      if (!result.didCancel) {
        setImageData(result);
        setIsModalOpen(false);
        navigation.navigate('UploadStatus', {data: result});
      }
    }
  };

  const takePhotoFromGallery = async () => {
    const granted = await requestCameraPermission();
    if (granted) {
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        quality: 0.5,
        selectionLimit: 1,
      });
      if (!result.didCancel) {
        setImageData(result);
        setIsModalOpen(false);
        navigation.navigate('UploadStatus', {data: result});
      }
    }
  };
  return (
    <Modal
      animationType="slide"
      visible={isModalOpen}
      transparent
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => setIsModalOpen(false)}>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'rgba(0,0,0,0.1)',
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              left: 8,
              width: '95%',
              height: 150,
              backgroundColor: '#fff',
              borderRadius: 10,
              elevation: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity onPress={takePhotoFromCamera}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../../images/camera-color.png')}
                  style={{height: 45, width: 45}}
                />
                <Text style={{color: '#000', marginTop: 7, fontSize: 16}}>
                  Camera
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhotoFromGallery}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../../images/gallery.png')}
                  style={{height: 45, width: 45}}
                />
                <Text style={{color: '#000', marginTop: 7, fontSize: 16}}>
                  Gallery
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OpenCameraOrGalleryModal;

const styles = StyleSheet.create({});
