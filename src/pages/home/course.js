import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getCoursefId} from '../../utils/db';

function Course({navigation}) {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const id = await getCoursefId();
      const response = await fetch(
        'https://jyssrmmas.pythonanywhere.com/api/coursdetails/?id_cour=' + id,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch course data');
      }
      const data = await response.json();
      console.log(JSON.stringify(data.data[0]));
      setCourseData(data.data[0]);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        padding: 10,
        paddingTop: 20,
        flex: 1,
        backgroundColor: 'white',
      }}>
      {courseData && (
        <>
          <View style={{display:'flex' , flexDirection:'row' , alignItems:'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{width: 40, height: 40, opacity: 0.3}}
                source={require('../../assets/home/GoBackb.png')}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 26, color: 'black' , marginLeft:10}}>
              Cours
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              marginTop: 60,
              width: 'auto',
            }}>
            <Image
              source={{
                uri:
                  'https://jyssrmmas.pythonanywhere.com/media/' +
                  courseData.image,
              }}
              style={{width: 200, height: 200, borderRadius: 10}}
            />
          </View>
          <View
            style={{
             padding:10,
              marginTop: 10,
              width: 'auto',
            }}>
            <Text style={{fontSize: 23, color: 'black', textAlign: 'center'}}>
              {courseData.nom_cour
                ? courseData.nom_cour.charAt(0).toUpperCase() +
                  courseData.nom_cour.slice(1)
                : ''}
            </Text>
            <View style={{marginTop: 40}}>
              <Text style={{fontSize: 20, color: 'black' , fontWeight:500}}>Description</Text>
              <Text style={{fontSize: 17, marginTop: 10 , color:'black' , opacity:0.8}}>
                {courseData.description}
              </Text>
            </View>
            <Text style={{fontSize: 20, color: 'black' , fontWeight:500 , marginTop:10}}>Programme</Text>
            <Text
              style={{fontSize: 17, marginTop: 10, color:'black' , opacity:0.8}}>
              {courseData.Programme}
            </Text>
            {/* You can add more fields here using courseData */}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

export default Course;
