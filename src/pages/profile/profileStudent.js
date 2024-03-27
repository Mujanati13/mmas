import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  getStudentId,
  getUserData,
  getstoreIdStudentProfile,
} from '../../utils/db';
import {CourseCard, CourseCardSpace} from '../../components/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; // Import the SkeletonPlaceholder component
import ImageUploaderStudent from '../../components/uploadImageStudent';
import {launchImageLibrary} from 'react-native-image-picker';

export default function ProfileStudent({navigation}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [newImage, setnewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const id = await getstoreIdStudentProfile();
        const response = await fetch(
          `https://jyssrmmas.pythonanywhere.com/api/etudiantInfo/?id_etudiant=${id}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImage(data.data[0].image);
        setUserData(data.data[0]); // Assuming the response contains user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await getstoreIdStudentProfile();
        const response = await fetch(
          `https://jyssrmmas.pythonanywhere.com/api/sean_by_id_etudiant/?id_etudiant=${id}`,
        );

        if (!response.ok) {
          // console.error(`HTTP error! Status: ${response.status}`);
          return; // Quitter prématurément de la fonction
        }
        try {
          const data = await response.json();
          if (
            !data ||
            !data.data ||
            !Array.isArray(data.data) ||
            data.data.length === 0
          ) {
            // Vérifier si les données sont vides ou ne contiennent pas la structure attendue
            // console.error('Invalid response data');
            return; // Quitter prématurément de la fonction
          }

          const uniqueCourses = {};
          data.data.forEach(item => {
            const courseName = item.nom_cours;
            if (!uniqueCourses[courseName]) {
              uniqueCourses[courseName] = item;
            }
          });
          setCourses(Object.values(uniqueCourses));
        } catch (error) {
          // console.error('Error parsing JSON:', error);
        }
      } catch (error) {
        // console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateImagePath = async imagePath => {
    const {image, ...rest} = userData;
    console.log(
      JSON.stringify({
        ...rest,
        image: imagePath,
      }),
    );
    try {
      const response = await fetch(
        'https://jyssrmmas.pythonanywhere.com/api/UpdateImage/', // Trailing slash added here
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...rest,
            image: imagePath,
          }),
        },
      );

      // Check for HTTP status codes in the range 200-299, indicating success
      if (response.ok) {
        const data = await response.json();
        setnewImage(imagePath);
        console.log('Image path updated successfully:', data);
      } else {
        // If the response status is not in the range 200-299, throw an error
        throw new Error(
          'Failed to update image path. Status: ' + response.status,
        );
      }
    } catch (error) {
      // Catch any errors that occur during the fetch operation
      console.error('Error updating image path:', error);
    }
  };

  const handleImageUpload = () => {
    launchImageLibrary({}, response => {
      if (!response.didCancel && !response.error) {
        const formData = new FormData();
        formData.append('uploadedFile', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName || 'image.jpg',
        });
        formData.append('path', 'client/'); // Assuming 'client/' is the desired path on the server
        setUploading(true);

        fetch('https://jyssrmmas.pythonanywhere.com/api/saveImage/', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to upload image');
            }
            return response.json();
          })
          .then(async data => {
            await updateImagePath(data.path);
            setUploading(false);
            // Alert.alert('Success', 'Image update successfully');
            console.log('Upload successful:', data.path);
          })
          .catch(error => {
            setUploading(false);
            Alert.alert('Error', error.message || 'Failed to upload image');
            console.error('Error uploading image:', error);
          });
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        padding: 20,
        paddingTop: 30,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileParent')}>
            <Image
              style={{width: 40, height: 40, opacity: 0.3}}
              source={require('../../assets/home/GoBackb.png')}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 26, color: 'black', marginLeft: 10}}>
            {userData && userData.civilite == 'Monsieur'
              ? 'Etudiant'
              : 'Etudiante'}
          </Text>
        </View>
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
        {newImage != null && newImage.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              handleImageUpload();
            }}>
            <Image
              style={{width: 140, height: 140, borderRadius: 20}}
              source={{
                uri: `https://jyssrmmas.pythonanywhere.com/media/${newImage}`,
              }}
            />
          </TouchableOpacity>
        ) : (
          userData?.image.length > 1 && (
            <TouchableOpacity
              onPress={() => {
                handleImageUpload();
              }}>
              <Image
                style={{width: 140, height: 140, borderRadius: 20}}
                source={{
                  uri: `https://jyssrmmas.pythonanywhere.com/media/${userData.image}`,
                }}
              />
            </TouchableOpacity>
          )
        )}
        {userData?.image.length === 0 && newImage === null && (
          <TouchableOpacity
            onPress={() => {
              handleImageUpload();
            }}>
            <Image
              style={{width: 140, height: 140, borderRadius: 20}}
              source={require('../../assets/home/deafult.jpg')} // Provide the path to the backup image
            />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          marginTop: 10,
          width: 'auto',
        }}>
        <Text style={{fontSize: 23, color: 'black', textAlign: 'center'}}>
          {userData ? `${userData.prenom} ${userData.nom}` : 'Loading...'}
        </Text>
        <View
          style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View>
            {/* <TouchableOpacity disabled={uploading} onPress={handleImageUpload}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/home/edit-image.png')}
              />
            </TouchableOpacity> */}
            {uploading && <ActivityIndicator style={{marginTop: 10}} />}
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              // navigation.navigate('EditProfileParent');
            }}>
            <View>
              <Image
                style={{width: 30, height: 30 , marginLeft:10}}
                source={require('../../assets/home/edit.png')}
              />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>

      {loading ? (
        <SkeletonPlaceholder>
          <View
            style={{
              backgroundColor: '#D1F3FD',
              width: 280,
              borderRadius: 15,
              marginTop: 20,
              padding: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                }}
              />
              <View style={{marginLeft: 5}}>
                <View style={{width: 170, height: 20, borderRadius: 4}} />
                <View
                  style={{
                    width: 100,
                    height: 15,
                    borderRadius: 0,
                    marginTop: 5,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginLeft: 65,
              }}>
              {/* <View style={{width: 25, height: 25, borderRadius: 12.5}} /> */}
              <View
                style={{
                  width: 100,
                  height: 18,
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : (
        <View style={{height: 'auto', marginTop: 30}}>
          {courses.length > 0 ? (
            <ScrollView horizontal>
              {courses.map((course, index) =>
                index === 0 ? (
                  <CourseCard key={index} course={course} id={course.id_cour} />
                ) : (
                  <CourseCardSpace
                    key={index}
                    course={course}
                    id={course.id_cour}
                  />
                ),
              )}
            </ScrollView>
          ) : (
            <Text>No courses available</Text>
          )}
        </View>
      )}
      {/* <View style={{marginTop: 40}}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
      </View> */}
    </SafeAreaView>
  );
}
