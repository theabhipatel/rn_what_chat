import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IRootStackParamList} from '../types';

interface IProps {
  toggleModal: boolean;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}
type NavigationPropType = NavigationProp<IRootStackParamList>;

const TopMenuModal: FC<IProps> = ({toggleModal, setToggleModal}) => {
  const navigation = useNavigation<NavigationPropType>();
  const gotoSettingsScreen = useCallback(() => {
    navigation.navigate('Profile');
    console.log(' i a m pressed .....');
  }, []);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toggleModal) {
      showAnimation();
    } else {
      hideAnimation();
    }
  }, [toggleModal]);

  const showAnimation = () => {
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideAnimation = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-1000, 0], // Adjust this range to control the animation
  });
  return (
    <Modal
      visible={toggleModal}
      animationType="fade"
      transparent
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => setToggleModal(false)}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.051)'}}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                right: 0,
                width: 120,
                height: 150,
                backgroundColor: '#eee',
                elevation: 10,
                transform: [{translateY}],
              },
            ]}>
            <TouchableOpacity
              style={{
                width: '100%',
                paddingLeft: 10,
                padding: 5,
              }}
              onPress={() => {
                gotoSettingsScreen();
                setToggleModal(false);
              }}>
              <Text style={{color: '#000', letterSpacing: 1}}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                paddingLeft: 10,
                padding: 5,
              }}
              onPress={() => {
                gotoSettingsScreen();
                setToggleModal(false);
              }}>
              <Text style={{color: '#000', letterSpacing: 1}}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                paddingLeft: 10,
                padding: 5,
              }}
              onPress={() => {
                gotoSettingsScreen();
                setToggleModal(false);
              }}>
              <Text style={{color: '#000', letterSpacing: 1}}>
                Linked device
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TopMenuModal;

const styles = StyleSheet.create({});
