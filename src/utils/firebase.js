import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage.data);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        setToken(token);
        updateToken(token);
      });

    return messaging().onTokenRefresh(token => {
      setToken(token);
      updateToken(token);
    });
  }, []);


  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Token: {token}</Text>
      {/* Rest of your app */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;