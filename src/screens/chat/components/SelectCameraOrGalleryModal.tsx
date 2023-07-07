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
import ImagePicker from 'react-native-image-crop-picker';

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setImagePath: Dispatch<SetStateAction<string | undefined>>;
}

const SelectCameraOrGalleryModal: FC<IProps> = ({
  isModalOpen,
  setIsModalOpen,
  setImagePath,
}) => {
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image: any) => {
      // console.log(image);
      setImagePath(image?.path);
    });
  };

  //  {"cropRect": {"height": 1856, "width": 1392, "x": 0, "y": 0}, "height": 400, "mime": "image/jpeg", "modificationDate": "1688629234000", "path": "file:///storage/emulated/0/Android/data/com.whatchat/files/Pictures/220b71c5-0365-4b1d-b9d6-55de2ed603e1.jpg", "size": 13724, "width": 300}
  // const takePhotoFromGallery = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     console.log(image);
  //   });
  // };

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
              width: '80%',
              height: 100,
              backgroundColor: '#eee',
              borderRadius: 10,
              elevation: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity onPress={takePhotoFromCamera}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../../images/camera.png')}
                  style={{height: 35, width: 35}}
                />
                <Text style={{color: '#000'}}> Camera</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhotoFromCamera}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../../images/camera.png')}
                  style={{height: 35, width: 35}}
                />
                <Text style={{color: '#000'}}> Gallery</Text>
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
