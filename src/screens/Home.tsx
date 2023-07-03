import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import ChatBox from '../components/ChatBox';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList, IRootTabParamList} from '../types';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

type IProps = CompositeScreenProps<
  NativeStackScreenProps<IRootStackParamList>,
  MaterialTopTabScreenProps<IRootTabParamList, 'Home'>
>;

const Home: FC<IProps> = () => {
  const [allUsers, setAllUsers] = useState<any[]>();
  const [id, setId] = useState<string | null>();
  console.log('---- allUsers ---> ', allUsers);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    // const email = await AsyncStorage.getItem('USER_EMAIL');
    const id = await AsyncStorage.getItem('USER_ID');
    setId(id);
    let tempData: any[] = [];
    firestore()
      .collection('users')
      .where('userId', '!=', id)
      .get()
      .then(res => {
        if (res.docs.length !== 0) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
          setAllUsers(tempData);
        }
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allUsers}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ChatBox user={item} id={id} />}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
