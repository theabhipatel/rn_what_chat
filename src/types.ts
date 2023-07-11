import {ImagePickerResponse} from 'react-native-image-picker';

export type IRootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Chat: {
    id: string | undefined;
    data: IUser;
  };
  Tabs: undefined;
  Profile: undefined;
  UploadStatus: {data: ImagePickerResponse};
};
export type IRootTabParamList = {
  Home: undefined;
  Status: undefined;
  Calls: undefined;
};

export interface IUser {
  email: string;
  name: string;
  photo: string;
  userId: string;
}
