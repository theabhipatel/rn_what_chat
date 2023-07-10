import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../../types';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

import SelectCameraOrGalleryModal from './components/SelectCameraOrGalleryModal';
import {Asset, ImagePickerResponse} from 'react-native-image-picker';
import uploadFile from '../../utils/uploadFile';
import ShowImage from './components/ShowImage';

type IProps = NativeStackScreenProps<IRootStackParamList, 'Chat'>;

const Chat: FC<IProps> = ({navigation, route}) => {
  const {photo, userId, name} = route.params.data;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [imageData, setImageData] = useState<ImagePickerResponse>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const [isSending, setIsSending] = useState(false);
  const themeMode = useColorScheme();

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
              backgroundColor: '#128C7E',
              elevation: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../images/back.png')}
                  style={{width: 25, height: 25, tintColor: '#fff'}}
                />
              </TouchableOpacity>
              <View style={{marginRight: 8}} />
              <TouchableOpacity>
                <Image
                  source={{uri: photo}}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#fff',
                }}>
                {name}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity>
                <Image
                  source={require('../../images/video-camera.png')}
                  style={{width: 25, height: 25, tintColor: '#fff'}}
                />
              </TouchableOpacity>
              <View style={{marginRight: 18}} />
              <TouchableOpacity>
                <Image
                  source={require('../../images/phone-call.png')}
                  style={{width: 20, height: 20, tintColor: '#fff'}}
                />
              </TouchableOpacity>
              <View style={{marginRight: 16}} />
              <TouchableOpacity>
                <Image
                  source={require('../../images/dots.png')}
                  style={{width: 22, height: 22, tintColor: '#fff'}}
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
      .doc(route?.params?.id + userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    // Load initial messages from Firebase
    const unsubscribe = chatRef.onSnapshot(snapShot => {
      const messageList = snapShot.docs.map(doc => {
        // console.log('---- doc ---->', doc);
        return doc.data() as IMessage;
      });
      setMessages(messageList);
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback(
    async (messages: any[]) => {
      setIsSending(true);
      let imageUrl;
      if (imageData?.assets) {
        if (imageData.assets[0].fileName && imageData.assets[0].uri) {
          imageUrl = await uploadFile(
            imageData?.assets[0].fileName,
            imageData?.assets[0].uri,
          );
          console.log('------- i am in uploadfile after fn');
        }
      }
      console.log('------ imageUrl after uploadImage ------->', imageUrl);
      const msg = messages[0];
      const myMsg = {
        ...msg,
        sendBy: route.params?.id,
        sentTo: userId,
        image: imageUrl ? imageUrl : '',
        createdAt: Date.parse(msg.createdAt),
      };
      setMessages(prevMessages => GiftedChat.append(prevMessages, myMsg));

      // Save masseges to firestore
      firestore()
        .collection('chats')
        .doc('' + route.params?.id + userId)
        .collection('messages')
        .add(myMsg);
      firestore()
        .collection('chats')
        .doc('' + userId + route.params?.id)
        .collection('messages')
        .add(myMsg);
      setIsSending(false);
      setIsShowImage(false);
      setImageData({});
    },
    [messages, imageData],
  );

  return (
    <>
      <ImageBackground
        resizeMode="cover"
        imageStyle={
          themeMode === 'dark'
            ? {tintColor: '#fff', backgroundColor: '#111111'}
            : {}
        }
        source={require('../../images/chatbg.png')}
        style={{flex: 1}}>
        <StatusBar backgroundColor={'#128C7E'} />
        <GiftedChat
          messages={messages}
          onSend={onSend}
          alwaysShowSend
          user={{
            _id: route.params?.id,
          }}
          timeTextStyle={{
            right: {color: themeMode === 'dark' ? '#fff' : '#000'},
          }}
          renderBubble={props => (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {backgroundColor: '#333333'},
                right: {
                  backgroundColor: themeMode === 'dark' ? '#075E54' : '#dcf8c6',
                },
              }}
              textStyle={{
                left: {color: '#FFF'},
                right: {color: themeMode === 'dark' ? '#fff' : '#000'},
              }}
            />
          )}
          messagesContainerStyle={{marginLeft: -45}}
          renderInputToolbar={props => {
            return (
              <InputToolbar
                {...props}
                containerStyle={{
                  borderColor: '#fff',
                  marginBottom: 5,
                  marginLeft: 5,
                  marginRight: 55,
                  borderRadius: 30,
                  elevation: 1,
                }}
              />
            );
          }}
          renderSend={props => {
            return (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => setIsModalOpen(true)}
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 16,
                  }}>
                  <Image
                    source={require('../../images/camera.png')}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
                <Send {...props}>
                  <View
                    style={{
                      backgroundColor: '#128C7E',
                      position: 'absolute',
                      right: -105,
                      bottom: 0,
                      width: 45,
                      height: 45,
                      borderRadius: 25,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {isSending ? (
                      <View>
                        <ActivityIndicator color={'#fff'} size={30} />
                      </View>
                    ) : (
                      <Image
                        source={require('../../images/send.png')}
                        // resizeMode={'center'}
                        style={{width: 25, height: 25, tintColor: '#fff'}}
                      />
                    )}
                  </View>
                </Send>
              </View>
            );
          }}
        />
      </ImageBackground>
      <SelectCameraOrGalleryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setImageData={setImageData}
        setIsShowImage={setIsShowImage}
      />
      {isShowImage && (
        <ShowImage
          setIsShowImage={setIsShowImage}
          setImageData={setImageData}
          imgUrl={imageData.assets ? imageData.assets[0].uri : ''}
        />
      )}
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({});
//  #075E54, #128C7E, and #25D366.23 The WhatsApp background color scheme consists of #075e54, #128c7e, #25d366, #dcf8c6, #34b7f1, and #ece5dd, #0fb0f1
