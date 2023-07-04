import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import ChatBox from '../components/ChatBox';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList, IRootTabParamList} from '../types';
import {CompositeScreenProps} from '@react-navigation/native';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

type IProps = CompositeScreenProps<
  MaterialTopTabScreenProps<IRootTabParamList, 'Home'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const Home: FC<IProps> = () => {
  const [allUsers, setAllUsers] = useState<any[]>();
  const [id, setId] = useState<string>();
  const [refreshing, setRefreshing] = useState(false);
  // console.log('---- allUsers ---> ', allUsers);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    console.log('----- i am called getUser--------->!!!');

    const id = await AsyncStorage.getItem('USER_ID');
    if (id) {
      setId(id);
    }
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

  // Function to handle refresh action
  const handleRefresh = async () => {
    console.log('----- i am called handleRefresh--------->!!!');

    setRefreshing(true);
    await getUser();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allUsers}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({item}) => <ChatBox user={item} id={id} />}
        ItemSeparatorComponent={() => (
          <View style={{height: 0.5, backgroundColor: '#ddd', width: '100%'}} />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              borderTopWidth: 0.51,
              borderColor: '#ddd',
              flexDirection: 'row',
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../images/lock.png')}
              style={{width: 12, height: 12, tintColor: '#128C7E'}}
            />
            <Text style={{color: '#128C7E', marginLeft: 5}}>
              end-to-encripted chat{' '}
            </Text>
          </View>
        )}
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
