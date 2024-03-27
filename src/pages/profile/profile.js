import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTokenFromStorage } from '../../utils/index'; // Import the function to retrieve token

export function Profile({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await getTokenFromStorage();
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  };

  const handleLogout = async () => {
    // Perform logout actions here, e.g., delete token from storage
    // Redirect to Login screen
    setIsLoggedIn(false);
    navigation.navigate('Login');
  };

  if (isLoggedIn) {
    // If user is not logged in, redirect to Login screen
    // return (
    //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //     <Text>Please log in to view this page.</Text>
    //     <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    //       <Text style={{ marginTop: 10, color: 'blue' }}>Go to Login</Text>
    //     </TouchableOpacity>
    //   </View>
    // );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View>
          <Image
            style={{ width: 35, height: 35 }}
            source={require('../../assets/chatbot/profile.png')}></Image>
        </View>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 20,
            fontWeight: '500',
            color: 'black',
          }}>
          Hello, Mohammed Janati
        </Text>
      </View>
      <View
        style={{
          width: 'auto',
          height: 250,
          borderRadius: 100,
          display: 'flex',
          alignSelf: 'center',
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: 20,
        }}>
        <Image
          style={{ height: 200, width: 200 }}
          source={require('../../assets/chatbot/robot.png')}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 70,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Chatbot')}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{ width: 35, height: 35 }}
              source={require('../../assets/chatbot/neeChat.png')}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: '500',
                marginLeft: 3,
              }}>
              New Chat
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../../assets/chatbot/history.png')}
          />
          <Text
            onPress={() => navigation.navigate('ChatHistory')}
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '500',
              marginLeft: 3,
            }}>
            Chat History
          </Text>
        </View>
      </View>
      <View
        style={{
          width: 'auto',
          height: 80,
          backgroundColor: 'white',
          marginTop: 50,
          borderRadius: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{ width: 25, height: 24 }}
          source={require('../../assets/chatbot/dossier.png')}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 19,
            marginLeft: 25,
            fontWeight: 'bold',
          }}>
          Add Your Medical Folder
        </Text>
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <View
          style={{
            width: 'auto',
            height: 50,
            backgroundColor: 'red',
            marginTop: 20,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 23,
              color: 'white',
              alignSelf: 'center',
              fontWeight: 600,
            }}>
            Logout
          </Text>
          <Image
            style={{ width: 20, height: 20, marginLeft: 10 }}
            source={require('../../assets/chatbot/logout1.png')}></Image>
        </View>
      </TouchableOpacity>
      <Text style={{ textAlign: 'center', marginTop: 20 }}>
        Your medical data is encrypted.
      </Text>
    </SafeAreaView>
  );
}
