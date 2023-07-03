import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../types';
import {Bubble, GiftedChat, IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

type IProps = NativeStackScreenProps<IRootStackParamList, 'Chat'>;

const Chat: FC<IProps> = ({navigation, route}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const {photo, userId, name} = route.params.data;
  // {"data": {"email": "abhishek.patel@stackinfinite.com", "name": "Abhishek Patel", "photo": "https://lh3.googleusercontent.com/a/AAcHTtfuPEMCWsxjCNLxbZtDQR_vieiL6Jkkre97asHAg3yv=s96-c", "userId": "e80693a9-9a70-4c20-b160-80412178e19b"}}
  useEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingVertical: 12,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../images/back.png')}
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
              <View style={{marginRight: 8}} />
              <TouchableOpacity>
                <Image
                  source={{uri: photo}}
                  style={{width: 30, height: 30, borderRadius: 15}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#000',
                }}>
                {name}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity>
                <Image
                  source={require('../images/video-camera.png')}
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
              <View style={{marginRight: 18}} />
              <TouchableOpacity>
                <Image
                  source={require('../images/phone-call.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
              <View style={{marginRight: 16}} />
              <TouchableOpacity>
                <Image
                  source={require('../images/dots.png')}
                  style={{width: 22, height: 22}}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      },
      // headerTitle:
    });
  }, [navigation]);

  useEffect(() => {
    const chatRef = firestore()
      .collection('chats')
      .doc(route?.params?.id + route.params?.data?.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    // Load initial messages from Firebase
    const unsubscribe = chatRef.onSnapshot(snapShot => {
      const messageList = snapShot.docs.map(doc => {
        console.log('---- doc ---->', doc);
        return doc.data() as IMessage;
      });
      setMessages(messageList);
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages: any[]) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params?.id,
      sentTo: route.params?.data?.userId,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessages(prevMessages => GiftedChat.append(prevMessages, myMsg));

    // Save masseges to firestore
    firestore()
      .collection('chats')
      .doc('' + route.params?.id + route.params?.data?.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route.params?.data?.userId + route.params?.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: route.params?.id,
      }}
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            left: {backgroundColor: '#333333'},
            right: {backgroundColor: '#007AFF'},
          }}
          textStyle={{
            left: {color: '#FFF'},
            right: {color: '#FFFFFF'},
          }}
        />
      )}
      // messagesContainerStyle={{}}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});
