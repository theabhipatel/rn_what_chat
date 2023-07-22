import storage from '@react-native-firebase/storage';

const uploadFile = async (fileName: string, pathToFile: string) => {
  const reference = storage().ref(fileName);

  await reference.putFile(pathToFile);
  let imageUrl = await storage().ref(fileName).getDownloadURL();
  return imageUrl;
};

export default uploadFile;
