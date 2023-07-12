import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, FC, SetStateAction, memo} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IRootStackParamList} from '../../../types';

interface IProps {
  photo: string;
  userId: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

type NavigationPropType = NavigationProp<IRootStackParamList>;

const StatusHeader: FC<IProps> = ({setIsModalOpen, photo, userId}) => {
  const navigation = useNavigation<NavigationPropType>();
  const isStatus = true;

  const handleClickOnHeader = () => {
    if (isStatus) {
      navigation.navigate('ShowStatus', {userId, photo});
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={handleClickOnHeader}>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 8,
              alignItems: 'center',
            }}>
            {isStatus ? (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 2,
                  borderColor: '#128C7E',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: '92%',
                    height: '92%',
                    borderRadius: 25,
                    backgroundColor: '#ccc',
                  }}>
                  {photo && (
                    <Image
                      source={{uri: photo}}
                      style={{width: '100%', height: '100%', borderRadius: 25}}
                    />
                  )}
                </View>
              </View>
            ) : (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#ccc',
                }}>
                {photo && (
                  <Image
                    source={{uri: photo}}
                    style={{width: 50, height: 50, borderRadius: 25}}
                  />
                )}

                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    height: 22,
                    width: 22,
                    backgroundColor: '#128C7E',
                    borderRadius: 11,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                  }}>
                  <Image
                    source={require('../../../images/plus.png')}
                    style={{width: 10, height: 10, tintColor: '#fff'}}
                  />
                </View>
              </View>
            )}

            <View style={{marginLeft: 15}}>
              <Text style={{fontSize: 16, color: '#000', fontWeight: '500'}}>
                My status
              </Text>
              <Text style={{fontSize: 12, color: '#aaa'}}>
                Tap to add status update
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          {isStatus && (
            <TouchableOpacity onPress={() => navigation.navigate('MyStatus')}>
              <Image
                source={require('../../../images/dots-hori.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={{color: '#aaa'}}>Recent updates</Text>
      </View>
    </>
  );
};

export default memo(StatusHeader);

const styles = StyleSheet.create({});
