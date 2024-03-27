import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getNotificationCount} from '../utils/db';

export function Footer({activeScreen}) {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0);

  // useEffect(async () => {
  //   const number = await getNotificationCount();
  //   setNotificationCount(number);
  // }, [notificationCount]);

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const getIconStyle = iconName => {
    return {
      padding: 5,
      backgroundColor: activeScreen === iconName ? '#E8FAFF' : 'transparent',
      borderRadius: activeScreen === iconName ? 10 : 0,
    };
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: '#fff',
        backgroundColor: '#8EE7FF',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <TouchableOpacity onPress={() => navigateToScreen('Home')}>
          <View style={getIconStyle('Home')}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/home/HomeIcon.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('ProfileParent')}>
          <View style={getIconStyle('Account')}>
            <Image
              style={{width: 32, height: 32}}
              source={require('../assets/home/Account.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Notifications')}>
          <View style={getIconStyle('Notification')}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../assets/home/Notification2.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Planing')}>
          <View style={getIconStyle('Planing')}>
            <Image
              style={{width: 35, height: 35}}
              source={require('../assets/home/Calendar.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Attendance')}>
          <View style={getIconStyle('Attendance')}>
            <Image
              style={{width: 35, height: 35}}
              source={require('../assets/home/Attendance.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
