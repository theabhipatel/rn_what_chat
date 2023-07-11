import React, {FC} from 'react';
import {ActivityIndicator, Modal, Text, View} from 'react-native';

interface IProps {
  isLoading: boolean;
  title?: string;
}

const Loader: FC<IProps> = ({isLoading, title}) => {
  return (
    <Modal transparent visible={isLoading}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={60} color={'#fff'} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '400',
            marginTop: 16,
            color: '#fff',
          }}>
          {title}
        </Text>
      </View>
    </Modal>
  );
};

export default Loader;
