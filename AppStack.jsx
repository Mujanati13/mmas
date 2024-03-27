import React, {useEffect, useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/pages/auth/login';
import ForgotPassword from './src/pages/auth/forgetPassword';
import PickStudent from './src/pages/home/pickStudent';
import Home from './src/pages/home/home';
import Etablissement from './src/pages/home/etablissement';
import ProfileTeacher from './src/pages/profile/profileTeacher';
import Course from './src/pages/home/course';
import Planing from './src/pages/home/planing';
import ProfileParent from './src/pages/profile/profileParent';
import EditProfileParent from './src/pages/profile/edit';
import Notifications from './src/pages/home/notification';
import 'react-native-gesture-handler';
import ProfileStudent from './src/pages/profile/profileStudent';
const Stack = createNativeStackNavigator();
import Attendance from './src/pages/home/attendance';
import getNewFCMToken from './src/utils/notifications';
import messaging from '@react-native-firebase/messaging';
import {addNotification} from './src/utils/db';
import NotificationPlus from './src/pages/home/notification_plus';
import About from './src/pages/home/about';
import {ChangePassword} from './src/pages/auth/changePassword';
import {requestNotifications} from 'react-native-permissions';

function App() {
  const [InitialRouteName, setinitialRouteName] = useState('Home');

  useEffect(() => {
    getNewFCMToken();

    requestNotifications(['alert', 'sound'], {
      title: 'Notification Permission Required',
      message: 'Please allow notifications to receive updates from the app.',
      buttonPositive: 'Allow',
      buttonNegative: 'Deny',
    }).then(({status, settings}) => {
      console.log('Notification permission status:', status);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage?.notification,
      );
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Handle foreground notification
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={InitialRouteName}>
        <Stack.Screen
          name="Welcome"
          component={Home}
          options={{headerShown: false}} // Hides the header bar
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PickStudent"
          component={PickStudent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Etablissement"
          component={Etablissement}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileTeacher"
          component={ProfileTeacher}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Course"
          component={Course}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Planing"
          component={Planing}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileParent"
          component={ProfileParent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfileParent"
          component={EditProfileParent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileStudent"
          component={ProfileStudent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Attendance"
          component={Attendance}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NotificationPlus"
          component={NotificationPlus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
