import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {IStatusData} from '../ShowStatus';
import getTimeFromNow from '../../../utils/getTimeFromNow';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IRootStackParamList} from '../../../types';

interface IProps {
  item: IStatusData;
}
type NavigationPropType = NavigationProp<IRootStackParamList>;

const StatusSeen: FC<IProps> = ({item}) => {
  const navigation = useNavigation<NavigationPropType>();

  const handleViewStatus = () => {
    navigation.navigate('ShowStatus', {
      userId: item.userId,
      photo: item.userPhoto,
      userName: item.userName,
    });
  };

  return (
    <TouchableOpacity onPress={handleViewStatus}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 1.8,
            borderColor: '#bbb',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: item.contentType.includes('image')
                ? item.mediaLink
                : item.userPhoto,
            }}
            style={{
              width: '92%',
              height: '92%',
              borderRadius: 25,
              backgroundColor: '#ccc',
            }}
          />
        </View>
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
              fontWeight: '500',
            }}>
            {item.userName}
          </Text>
          <Text style={{fontSize: 12, color: '#aaa'}}>
            {' '}
            {getTimeFromNow(item.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StatusSeen;

const styles = StyleSheet.create({});
