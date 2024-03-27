import React, {useEffect} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  formatDate,
  splitTextWithEllipsis,
  storeIdCourse,
  storeIdNotification,
  storeIdProf,
  storeIdStudentProfile,
  storeIdstudent,
} from '../../utils/db';

function PickStudentCard({student, id}) {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={async () => {
          try {
            await storeIdstudent(id);
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          } catch (error) {
            console.error('Error storing student ID:', error);
            // Handle the error appropriately
          }
        }}>
        <View
          style={{
            backgroundColor: '#FCFCFC',
            width: 'auto',
            height: 80,
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View style={{padding: 10}}>
            <View
              style={{
                backgroundColor: 'white',
                width: 60,
                height: 60,
                borderRadius: 30,
              }}>
              {student?.image.length > 0 && (
                <Image
                  style={{
                    alignSelf: 'center',
                    marginTop: 3,
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                  }}
                  source={{
                    uri:
                      `https://jyssrmmas.pythonanywhere.com/media/` +
                      student.image,
                  }}></Image>
              )}
              {student?.image.length == 0 && (
                <Image
                  style={{width: 60, height: 60, borderRadius: 20}}
                  source={require('../../assets/home/deafult.jpg')} // Provide the path to the backup image
                />
              )}
            </View>
          </View>
          <View>
            <Text style={{fontSize: 22, color: 'black'}}>
              {student.etudiant}
            </Text>
            {/* <Text style={{fontSize: 15}}>Identity : GGBv13</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function PickStudentCardStudents({student, id}) {
  console.log(JSON.stringify(student) + ' dqqqqqqqqqqqqqq');
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={async () => {
          try {
            await storeIdStudentProfile(id);
            navigation.reset({
              index: 0,
              routes: [{name: 'ProfileStudent'}],
            });
          } catch (error) {
            console.error('Error storing student ID:', error);
            // Handle the error appropriately
          }
        }}>
        <View
          style={{
            backgroundColor: '#FCFCFC',
            width: 'auto',
            height: 80,
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View style={{padding: 10}}>
            <View
              style={{
                backgroundColor: 'white',
                width: 60,
                height: 60,
                borderRadius: 30,
              }}>
              {student?.image.length > 0 && (
                <Image
                  style={{
                    alignSelf: 'center',
                    marginTop: 3,
                    width: 60,
                    height: 60,
                    borderRadius: 15,
                  }}
                  source={{
                    uri:
                      'https://jyssrmmas.pythonanywhere.com/media/' +
                      student.image,
                  }}></Image>
              )}
              {student?.image.length == 0 && (
                <Image
                  style={{width: 60, height: 60, borderRadius: 20}}
                  source={require('../../assets/home/deafult.jpg')} // Provide the path to the backup image
                />
              )}
            </View>
          </View>
          <View>
            <Text style={{fontSize: 22, color: 'black'}}>
              {student.etudiant}
            </Text>
            {/* <Text style={{fontSize: 15}}>Identity : GGBv13</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function ProfCard({professor, id}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={async () => {
        await storeIdProf(id);
        navigation.navigate('ProfileTeacher');
      }}>
      <View
        style={{
          backgroundColor: '#B7DCFE',
          width: 280,
          borderRadius: 15,
          marginTop: 20,
          padding: 15,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                width: 60,
                padding: 2,
                borderRadius: 30,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  marginTop: 3,
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
                source={{
                  uri:
                    'https://jyssrmmas.pythonanywhere.com/media/' +
                    professor[0].image,
                }}></Image>
            </View>
          </View>
          <View style={{marginLeft: 5}}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                width: 170,
                fontWeight: 500,
              }}>
              {professor[0].nom} {professor[0].prenom}
            </Text>
            {/* <Text style={{fontSize: 15}}>Iden : GGBv13</Text> */}
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/home/Book.png')}
          />
          <Text style={{fontSize: 18, color: 'black', marginLeft: 7}}>
            {professor[0].fonction}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
function ProfCardSpace({professor, id}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={async () => {
        await storeIdProf(id);
        navigation.navigate('ProfileTeacher');
      }}>
      <View
        style={{
          backgroundColor: '#B7DCFE',
          width: 280,
          borderRadius: 15,
          marginTop: 20,
          padding: 15,
          marginLeft: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                width: 60,
                padding: 2,
                borderRadius: 30,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  marginTop: 3,
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
                source={{
                  uri:
                    'https://jyssrmmas.pythonanywhere.com/media/' +
                    professor[0].image,
                }}></Image>
            </View>
          </View>
          <View style={{marginLeft: 5}}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                width: 170,
                fontWeight: 500,
              }}>
              {professor[0].nom} {professor[0].prenom}
            </Text>
            {/* <Text style={{fontSize: 15}}>Iden : GGBv13</Text> */}
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/home/Book.png')}
          />
          <Text style={{fontSize: 18, color: 'black', marginLeft: 7}}>
            {professor[0].fonction}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function CourseCard({course, id}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={async () => {
        await storeIdCourse(id);
        navigation.navigate('Course');
      }}>
      <View
        style={{
          backgroundColor: '#B7DCFE',
          width: 280,
          borderRadius: 15,
          marginTop: 20,
          padding: 15,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                // backgroundColor: 'white',
                width: 60,
                padding: 2,
                borderRadius: 30,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  marginTop: 3,
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
                source={{
                  uri:
                    'https://jyssrmmas.pythonanywhere.com/media/' +
                    course.image,
                }}></Image>
            </View>
          </View>
          <View style={{marginLeft: 5}}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                width: 170,
                fontWeight: '500',
              }}>
              {course.nom_cours
                ? course.nom_cours.charAt(0).toUpperCase() +
                  course.nom_cours.slice(1)
                : ''}
            </Text>

            <Text style={{fontSize: 14, width: 180 , color:'black' , opacity:0.8}}>
              {course.description
                ? course.description.charAt(0).toUpperCase() +
                  course.description.slice(1, 33) + // Limiting to 20 characters
                  (course.description.length > 33 ? '...' : '')
                : ''}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          {/* <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/home/Star.png')}
          />
          <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/home/Star.png')}
          />
          <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/home/Star.png')}
          />
          <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/home/Star.png')}
          /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function CourseCardSpace({course, id}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={async () => {
        await storeIdCourse(id);
        navigation.navigate('Course');
      }}>
      <View
        style={{
          backgroundColor: '#B7DCFE',
          // backgroundColor: '#D1F3FD',
          width: 280,
          borderRadius: 15,
          marginTop: 20,
          padding: 15,
          marginLeft: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                // backgroundColor: 'white',
                width: 60,
                padding: 2,
                borderRadius: 30,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  marginTop: 3,
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
                source={{
                  uri:
                    'https://jyssrmmas.pythonanywhere.com/media/' +
                    course.image,
                }}></Image>
            </View>
          </View>
          <View style={{marginLeft: 5}}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                width: 170,
                fontWeight: '500',
              }}>
              {course.nom_cours
                ? course.nom_cours.charAt(0).toUpperCase() +
                  course.nom_cours.slice(1)
                : ''}
            </Text>
            <Text style={{fontSize: 14, width: 180, color:'black' , opacity:0.8}}>
              {course.description
                ? course.description.charAt(0).toUpperCase() +
                  course.description.slice(1, 33) + // Limiting to 20 characters
                  (course.description.length > 33 ? '...' : '')
                : ''}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          {/* <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/home/Star.png')}
          />
          <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/home/Star.png')}
          />
          <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/home/Star.png')}
          />
          <Image
            style={{width: 25, height: 25}}
            source={require('../../assets/home/Star.png')}
          /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function NotificationsCard({notification}) {
  console.log(notification);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={async () => {
        await storeIdNotification(notification.id_notif);
        navigation.navigate('NotificationPlus');
      }}>
      <View
        style={{
          backgroundColor: '#F9FAFF',
          width: 'auto',
          padding: 20,
          paddingRight: 30,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <View style={{width:300}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 500}}>
            {splitTextWithEllipsis(
              false ? 'sujet test' : notification.sujet,
              17,
            )}{' '}
            <Text style={{fontSize: 16, color: 'grey', fontVariant: '200'}}>
              {formatDate(notification['date envoi'])}
            </Text>
          </Text>
          <Text style={{fontSize: 17, marginTop: 5, color: 'black', opacity:0.6}}>
            {splitTextWithEllipsis(notification.content, 37)}
          </Text>
        </View>
        <View style={{paddingRight: 20}}>
          <Image
            style={{opacity: 0.2, width: 22, height: 22}}
            source={require('../../assets/home/Mail.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export {
  NotificationsCard,
  PickStudentCardStudents,
  PickStudentCard,
  ProfCard,
  ProfCardSpace,
  CourseCard,
  CourseCardSpace,
};
