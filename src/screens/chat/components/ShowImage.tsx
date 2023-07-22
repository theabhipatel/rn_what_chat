import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';

interface IProps {
  imgUrl: string | undefined;
  setIsShowImage: Dispatch<SetStateAction<boolean>>;
  setImageData: Dispatch<React.SetStateAction<ImagePickerResponse>>;
}

const ShowImage: FC<IProps> = ({setIsShowImage, imgUrl, setImageData}) => {
  const handleClose = () => {
    setIsShowImage(false);
    setImageData({});
  };
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 60,
        left: 8,
        width: '80%',
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#fff',
      }}>
      <Image
        source={{uri: imgUrl}}
        style={{width: '100%', height: '100%', borderRadius: 10}}
      />
      <View style={{position: 'absolute', right: 10, top: 10}}>
        <TouchableOpacity onPress={handleClose}>
          <Image
            source={require('../../../images/close.png')}
            style={{width: 12, height: 12, tintColor: '#fff'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShowImage;
