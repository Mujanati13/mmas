import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import CurrentDate from '../../utils';
import {calculateTimeDifference, formatDate, getstoreIdNotification} from '../../utils/db';

const NotificationPlus = ({navigation}) => {
  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      const notifId = await getstoreIdNotification();
      console.log(notifId);
      try {
        const response = await fetch(
          'https://jyssrmmas.pythonanywhere.com/api/notifDetail/?id_notif=' +
            notifId,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setNotificationData(data.data[0]); // Assuming the response contains notification detail
      } catch (error) {
        console.error('Error fetching notification detail:', error);
      }
    };

    fetchNotificationDetail();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          marginTop: 20,
          justifyContent:'space-between'
        }}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{width: 40, height: 40, opacity: 0.3}}
              source={require('../../assets/home/GoBackb.png')}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 18, color: 'black', marginLeft: 10}}>
            {calculateTimeDifference(notificationData&&notificationData.date_envoye)}
          </Text>
        </View>
        <Text style={{color:'black' , opacity:0.7}}>{notificationData&&notificationData.date_envoye}</Text>
      </View>
      {notificationData && (
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{color: 'black', fontWeight: '600', fontSize: 20}}>
              {notificationData.sujet}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              lineHeight: 25,
              marginTop: 20,
              color:'black',
              opacity:0.7
            }}>
            {notificationData.contenu}{' '}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NotificationPlus;
