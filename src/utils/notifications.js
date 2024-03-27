import messaging from '@react-native-firebase/messaging';
import {getUserData, updateToken} from './db';
import {CommonActions, useNavigation} from '@react-navigation/native';

// Define the background message handler
const backgroundMessageHandler = async remoteMessage => {
  console.log('Handling a background message:', remoteMessage);
  // You can handle the message here and perform actions like showing a notification
};

// Set the background message handler
messaging().setBackgroundMessageHandler(backgroundMessageHandler);

// Function to request user permission for notifications and update FCM token
const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    const token = await messaging().getToken();
    const userData = await getUserData();
    if (userData) {
      console.log(token + " token");
      await updateToken(token, userData.id_parent);
    }
  } else {
    console.log('REQUEST PERMISSION DENIED');
  }
};

// Function to get a new FCM token
const getNewFCMToken = async () => {
  try {
    await requestUserPermission();
  } catch (error) {
    console.error('Error getting new FCM token:', error);
  }
};

export default getNewFCMToken;
