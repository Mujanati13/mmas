import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { checkIfLoggedIn } from '../../utils/db';

function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await checkIfLoggedIn();
      if (isLoggedIn == false) {
        navigation.replace('Home'); // Navigate to Home if user is already logged in
      } else {
        navigation.replace('Login'); // Navigate to Login if user is not logged in
      }
    };

    // Add navigation listener
    const unsubscribe = navigation.addListener('focus', () => {
      checkLoginStatus();
    });
    // Cleanup
    return unsubscribe;
  }, [navigation]); // Ensure useEffect runs when navigation changes

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#FF9900" />
    </View>
  );
}

export default SplashScreen;
