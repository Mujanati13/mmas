import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {Footer} from '../../components/footer';
import {
  CurrentDatPluse,
  checkIfLoggedIn,
  getStudentId,
  getUserData,
  logout,
  splitTextWithEllipsis,
} from '../../utils/db';
import {NotificationsCard, PickStudentCard} from '../../components/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrentDate from '../../utils';
import MSGListen from '../../utils/firebase';

function Notifications({navigation}) {
  const [isMneuav, setisMneuav] = useState(false);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const [idParent, setIdParent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentis, setcurrentis] = useState();
  const [curImage, setCurImage] = useState();
  const [notifications, setNotifications] = useState([]);
  const [userData, setUserData] = useState();

  const toggleleMenuOpen = () => {
    setisMneuav(true);
  };
  const toggleleMenuClose = () => {
    setisMneuav(false);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkIfLoggedIn();
      const id = await getStudentId();
      setcurrentis(id);
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getUserData();
        if (userData) {
          setUserData(userData);
          setIdParent(userData.id_parent);
        }

        // Récupérer les données des étudiants stockées dans AsyncStorage
        const storedStudentData = await AsyncStorage.getItem('studentData');
        if (storedStudentData) {
          const parsedStudentData = JSON.parse(storedStudentData);
          setStudentList(parsedStudentData);
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
    if (isLoggedIn) {
      // navigation.navigate('Login'); // Rediriger vers l'écran de connexion si non connecté
    }
  }, [isLoggedIn, navigation]);

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
    // Fetch notifications when the component mounts or when currentis changes
    if (currentis) {
      fetchNotifications();
    }
  }, [currentis]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const userData = await getUserData();
      const response = await fetch(
        `https://jyssrmmas.pythonanywhere.com/api/get_all_notif/?id_client=${userData.id_parent}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotifications(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        padding: 20,
        paddingTop: 30,
        flex: 1,
        backgroundColor: 'white',
      }}>
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
      <TouchableWithoutFeedback onPress={toggleleMenuClose}>
        <View>
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
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                letterSpacing: 0.8,
              }}>
              Notifications
            </Text>
            <TouchableOpacity>
              {userData && (
                <Image
                  style={{width: 40, height: 40, borderRadius: 20}}
                  source={{
                    uri:
                      'https://jyssrmmas.pythonanywhere.com/media/' +
                      userData.image,
                  }}
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
                      Se déconnecter
                    </Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </TouchableOpacity>
          </Modal>
          <View style={{marginTop: 10, paddingBottom: 25}}>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <ScrollView style={{paddingBottom: 25}}>
                {notifications.map((notification, index) => (
                  <NotificationsCard key={index} notification={notification} />
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Footer activeScreen={'Notification'} />
    </SafeAreaView>
  );
}

export default Notifications;
