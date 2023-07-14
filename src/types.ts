import {ImagePickerResponse} from 'react-native-image-picker';
import {IStatusData} from './screens/status/ShowStatus';

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
  ShowStatus: {userId: string | undefined; photo: string | undefined};
  MyStatus:
    | undefined
    | {statusData: IStatusData[]; userId: string; photo: string};
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
