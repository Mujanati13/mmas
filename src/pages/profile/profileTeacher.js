import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getProfId} from '../../utils/db';

function ProfileTeacher({navigation}) {
  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      const id = await getProfId();
      const response = await fetch(
        'https://jyssrmmas.pythonanywhere.com/api/prof/?id_prof=' + id,
      );
      if (!response.ok) {
        // throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTeacherData(data.data[0]);
    } catch (error) {
      console.error('Error fetching teacher data:', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        padding: 20,
        flex: 1,
        backgroundColor: 'white',
      }}>
      {teacherData && (
        <>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{width: 40, height: 40, opacity: 0.3}}
                source={require('../../assets/home/GoBackb.png')}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 26, color: 'black', marginLeft: 10}}>
              Prof
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 40,
              width: 'auto',
            }}>
            <Image
              source={{
                uri:
                  'https://jyssrmmas.pythonanywhere.com/media/' +
                  teacherData.image,
              }}
              style={{width: 150, height: 150}}
            />
          </View>
          <View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                marginTop: 10,
                width: 'auto',
              }}>
              <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>
                {teacherData.nom} {teacherData.prenom}
              </Text>
            </View>
            <View style={{marginTop:20}}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: 600,
                  marginTop: 20,
                }}>
                Description:
              </Text>
              <Text style={{fontSize: 16, color: 'black', opacity: 0.8}}>
                {teacherData.Description}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: 600,
                  marginTop: 15,
                }}>
                Mail:
              </Text>
              <Text style={{fontSize: 16, color: 'black', opacity: 0.8}}>
                {teacherData.mail}
              </Text>
            </View>
            <View style={{padding: 10, marginTop: 20}}></View>
            {/* You can add more fields here using teacherData */}
          </View>
        </>
      )}
      {/* <View
        style={{
          width: 'auto',
          height: 60,
          backgroundColor: '#E0FAE0',
          marginTop: 20,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '500',
            textAlign: 'center',
            textAlignVertical: 'center',
            paddingTop: 12,
            color: 'black',
            letterSpacing: 0.8,
          }}>
          Profile
        </Text>
      </View> */}
    </SafeAreaView>
  );
}

export default ProfileTeacher;
