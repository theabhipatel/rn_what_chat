import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatBox from '../components/ChatBox';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../types';
import {useNavigation} from '@react-navigation/native';

// type IProps = NativeStackScreenProps<IRootStackParamList, ''>

const Home = () => {
  const [allUsers, setAllUsers] = useState<any[]>();
  console.log('---- allUsers ---> ', allUsers);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const email = await AsyncStorage.getItem('USER_EMAIL');
    let tempData: any[] = [];
    firestore()
      .collection('users')
      .where('email', '!=', email)
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
        renderItem={({item}) => <ChatBox user={item} />}
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
