import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Footer} from '../../components/footer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AgendaPresenece} from './agendaPresence';
import {getStudentId, getUserData, logout} from '../../utils/db';
import {PickStudentCard} from '../../components/home';
import messaging from '@react-native-firebase/messaging';

export default function Attendance({navigation}) {
  const [currentis, setcurrentis] = useState();
  const [isMneuav, setisMneuav] = useState(false);
  const [curImage, setCurImage] = useState();
  const [studentList, setStudentList] = useState([]);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [idParent, setIdParent] = useState(null);

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage?.notification,
    );
    navigation.navigate('Notifications');
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      const id = await getStudentId();
      setcurrentis(id);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jyssrmmas.pythonanywhere.com/api/etudiantInfo/?id_etudiant=${currentis}`,
        );
        if (!response.ok) {
          // throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCurImage(data.data[0].image); // Assuming the response contains user data
      } catch (error) {
        // console.error('Error fetching user data:', error);
      } finally {
      }
    };

    fetchData();
  }, [currentis]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getUserData();
        if (userData) {
          setIdParent(userData.id_parent);
        }

        // Récupérer les données d'étudiant stockées depuis AsyncStorage
        const storedStudentData = await AsyncStorage.getItem('studentData');
        if (storedStudentData) {
          const parsedStudentData = JSON.parse(storedStudentData);
          // setStudentList(parsedStudentData);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        // Gérer l'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentis]);

  const toggleleMenuOpen = () => {
    setisMneuav(true);
  };
  const toggleleMenuClose = () => {
    setisMneuav(false);
  };
  const toggleProfileMenu = () => {
    setIsProfileMenuVisible(!isProfileMenuVisible);
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      // Gérer l'erreur si la déconnexion échoue
    }
  };

  useEffect(() => {
    const fetchStudentList = async () => {
      try {
        setLoading(true); // Définir loading à true avant la récupération
        const response = await fetch(
          `https://jyssrmmas.pythonanywhere.com/api/etudiants_by_parent/?id_parent=${idParent}`,
        );
        if (!response.ok) {
          // throw new Error('La réponse du réseau n\'était pas correcte');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log(JSON.stringify(data) + ' belll');
          setStudentList(data.data);
          studentList.map(student => {
            if (student.id_etudiant == currentis) {
            }
          });
        } else {
          // throw new Error('Type de contenu inattendu reçu');
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération de la liste des étudiants :',
          error,
        );
        // Gérer l'erreur
      } finally {
        setLoading(false); // Définir loading à false après la récupération, indépendamment du succès ou de l'échec
      }
    };
    fetchStudentList();
  }, [idParent, isProfileMenuVisible]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {isMneuav ? (
        <View
          style={{
            flex: 1,
            width: '65%', // Set the width to 50% of the screen
            backgroundColor: '#ffff',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0, // Position the menu on the left side of the screen
            zIndex: 100,
            transform: isMneuav ? 'translateX(0)' : 'translateX(-100%)',
            opacity: isMneuav ? 1 : 0,
            padding: 20,
            paddingTop: 30,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            transitionProperty: 'transform opacity',
            transitionDuration: '0.3s',
          }}>
          <TouchableOpacity style={{}} onPress={toggleleMenuClose}>
            <Image
              style={{
                width: 23,
                height: 23,
                // borderColor: 'black',
                // borderWidth: 0.5,
              }}
              source={require('../../assets/home/Close2.png')}
            />
          </TouchableOpacity>
          <View style={{marginTop: 40}}></View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`https://meetmeafterschool.ma/decouvrir-mmas/`);
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/discovery.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  textAlign: 'center',
                  padding: 10,
                  // color: 'blue',
                  fontWeight: 600,
                }}>
                Decouvrir MMAS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`https://meetmeafterschool.ma/vivre-chez-mmas/`);
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/link.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  textAlign: 'center',
                  padding: 10,
                  // color: '',
                  fontWeight: 600,
                }}>
                Vivre chez MMAS
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`https://meetmeafterschool.ma/faqs/`);
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/questions.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  textAlign: 'center',
                  padding: 10,
                  // color: '',
                  fontWeight: 600,
                }}>
                FAQ
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => {
                navigation.navigate('ChangePassword');
                toggleleMenuClose();
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/profileuse.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  padding: 10,
                  color: 'black',
                  fontWeight: 600,
                  width: 200,
                }}>
                Changer Mot de passe
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => {
                toggleleMenuClose();
                navigation.navigate('About');
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/home/About.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  textAlign: 'center',
                  padding: 10,
                  color: 'black',
                  fontWeight: 600,
                }}>
                à propos{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              padding: 25,
              backgroundColor: 'white',
            }}>
            <TouchableOpacity onPress={handleLogout}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  alignSelf: 'center',
                  color: 'red',
                  fontWeight: 600,
                }}>
                Déconnexion
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        ''
      )}
      <TouchableWithoutFeedback style={{flex: 1}} onPress={toggleleMenuClose}>
        <View style={{padding: 20}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                toggleleMenuOpen();
              }}>
              <Image
                style={{width: 34, height: 34}}
                source={require('../../assets/home/Menu.png')}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 20, color: 'black'}}>Presence</Text>
            <TouchableOpacity onPress={toggleProfileMenu}>
              {curImage && (
                <Image
                  style={{width: 40, height: 40, borderRadius: 20}}
                  source={{
                    uri: `https://jyssrmmas.pythonanywhere.com/media/${curImage}`,
                  }}
                />
              )}
              {curImage?.length == 0 && (
                <Image
                  style={{width: 40, height: 40, borderRadius: 20}}
                  source={require('../../assets/home/deafult.jpg')} // Provide the path to the backup image
                />
              )}
            </TouchableOpacity>
          </View>
          <Modal
            visible={isProfileMenuVisible}
            transparent={true}
            animationType="fade">
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'flex-end',
              }}
              onPress={toggleProfileMenu}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <Text style={{fontSize: 20}}>
                  {studentList.map(student => {
                    if (student.id_etudiant == currentis) {
                      const capitalized =
                        student.etudiant.charAt(0).toUpperCase() +
                        student.etudiant.slice(1);
                      return `${capitalized} (profil actuel)`;
                    }
                  })}
                </Text>
                {studentList
                  .filter(student => student.id_etudiant != currentis)
                  .map((student, index) => (
                    <TouchableOpacity
                      key={student.id_etudiant}
                      onPress={() => {
                        setcurrentis(student.id_etudiant); // Mettre à jour l'état currentis
                      }}>
                      <PickStudentCard
                        key={index}
                        student={student}
                        id={student.id_etudiant}
                      />
                    </TouchableOpacity>
                  ))}
                {/* <TouchableOpacity onPress={handleLogout}>
                  <View
                    style={{
                      width: 'auto',
                      height: 60,
                      backgroundColor: 'red',
                      marginTop: 20,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: '500',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        color: 'white',
                        letterSpacing: 0.8,
                      }}>
                      Déconnexion
                    </Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
      <AgendaPresenece id={currentis} />
      <Footer activeScreen={'Attendance'} />
    </SafeAreaView>
  );
}
