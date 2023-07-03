export type IRootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Chat: {
    id: string;
    data: IUser;
  };
  Tabs: undefined;
  Profile: undefined;
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
