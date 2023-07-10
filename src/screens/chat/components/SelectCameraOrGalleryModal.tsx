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
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import requestCameraPermission from '../../../utils/requestCameraPermission';

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setImageData: Dispatch<SetStateAction<ImagePickerResponse>>;
  width?: '95%' | '80%';
}

const SelectCameraOrGalleryModal: FC<IProps> = ({
  isModalOpen,
  setIsModalOpen,
  setImageData,
  width,
}) => {
  const takePhotoFromCamera = async () => {
    const granted = await requestCameraPermission();
    if (granted) {
      const result = await launchCamera({mediaType: 'photo', quality: 0.7});
      if (!result.didCancel) {
        setImageData(result);
      }
    }
  };

  const takePhotoFromGallery = async () => {
    const granted = await requestCameraPermission();
    console.log('--------->>>', granted);

    if (granted) {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
        selectionLimit: 1,
      });
      if (!result.didCancel) {
        setImageData(result);
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
              bottom: 60,
              left: 8,
              width: width ? width : '80%',
              height: 100,
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
                <Text style={{color: '#000', marginTop: 5}}> Camera</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhotoFromGallery}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../../images/gallery.png')}
                  style={{height: 45, width: 45}}
                />
                <Text style={{color: '#000', marginTop: 5}}> Gallery</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SelectCameraOrGalleryModal;

const styles = StyleSheet.create({});

//  {"cropRect": {"height": 1856, "width": 1392, "x": 0, "y": 0}, "height": 400, "mime": "image/jpeg", "modificationDate": "1688629234000", "path": "file:///storage/emulated/0/Android/data/com.whatchat/files/Pictures/220b71c5-0365-4b1d-b9d6-55de2ed603e1.jpg", "size": 13724, "width": 300}
