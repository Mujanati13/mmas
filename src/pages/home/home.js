import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CourseCard,
  CourseCardSpace,
  PickStudentCard,
  ProfCard,
  ProfCardSpace,
} from '../../components/home';
import {Footer} from '../../components/footer';
import {
  checkIfLoggedIn,
  getStudentId,
  getUserData,
  logout,
  storeUniqueProfIds,
} from '../../utils/db';

// import Svg, { Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; // Import the SkeletonPlaceholder component
import MenuSVG from '../../assets/home/Menu.svg';
import messaging from '@react-native-firebase/messaging';

function Home({navigation}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const [idParent, setIdParent] = useState(null);
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMneuav, setisMneuav] = useState(false);
  const [currentis, setcurrentis] = useState();
  const [courses, setCourses] = useState([]);
  const [uniqueProfIds, setUniqueProfIds] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [etablissementData, setEtablissementData] = useState(null);
  const [curImage, setCurImage] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, seterror] = useState(false);

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage?.notification,
    );
    navigation.navigate('Notifications');
  });

  useEffect(() => {
    fetchData();
  }, [currentis]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://jyssrmmas.pythonanywhere.com/api/sean_by_id_etudiant/?id_etudiant=' +
          currentis,
      );
      if (!response.ok) {
        // throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      if (!data || !data.data || !Array.isArray(data.data)) {
        // throw new Error('Invalid response data');
      }
      const ids = data.data.map(item => item.id_prof);
      const uniqueIds = Array.from(new Set(ids)); // Supprimer les ID en double
      setUniqueProfIds(uniqueIds);
      storeUniqueProfIds(uniqueIds); // Stocker les identifiants uniques des professeurs
      fetchProfessors(uniqueIds);
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  const fetchProfessors = async ids => {
    try {
      const professors = [];
      for (const id of ids) {
        const response = await fetch(
          'https://jyssrmmas.pythonanywhere.com/api/prof/?id_prof=' + id,
        );
        if (!response.ok) {
          // throw new Error(`Failed to fetch professor with ID ${id}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const professorData = await response.json();
          professors.push(professorData.data);
        } else {
          // throw new Error('Invalid content type: expected JSON');
        }
      }
      setProfessors(professors);
    } catch (error) {
      // console.error('Error fetching professors:', error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await checkIfLoggedIn();
      if (loggedIn == false) {
        navigation.replace('Login');
      }
      const id = await getStudentId();
      setcurrentis(id);
      console.log(id + "id student");
      setIsLoggedIn(loggedIn);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      //  // Rediriger vers l'écran de connexion si non connecté
    }
  }, [isLoggedIn, navigation]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getUserData();
        if (userData) {
          setIdParent(userData.id_parent);
        }

        const storedStudentData = await AsyncStorage.getItem('studentData');
        if (storedStudentData) {
          const parsedStudentData = JSON.parse(storedStudentData);
          // setStudentList(parsedStudentData);
          // studentList.map(student => {
          //   if (student.id_etudiant == currentis) {
          //   }
          // });
        }

        // Fetch course data
        const response = await fetch(
          `https://jyssrmmas.pythonanywhere.com/api/sean_by_id_etudiant/?id_etudiant=${currentis}`,
        );

        if (!response.ok) {
          // console.error(`HTTP error! Status: ${response.status}`);
          setLoading(false); // Définir l'état de chargement sur false pour arrêter l'indicateur de chargement
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
            setLoading(false); // Définir l'état de chargement sur false pour arrêter l'indicateur de chargement
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
          seterror('Error parsing JSON:', error);
          // console.error('Error parsing JSON:', error);
        }
      } catch (error) {
        seterror('Error fetching data:', error);
        // console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentis, error]);

  const toggleProfileMenu = () => {
    setIsProfileMenuVisible(!isProfileMenuVisible);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Gérer l'erreur si la déconnexion échoue
    }
  };

  const toggleleMenuOpen = () => {
    setisMneuav(true);
  };

  const toggleleMenuClose = () => {
    setisMneuav(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jyssrmmas.pythonanywhere.com/api/etablissements/',
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log(data.data[0]);
          setEtablissementData(data.data[0]);
        } else {
          // seterror('Invalid content type: expected JSON');
          // throw new Error('Invalid Fcontent type: expected JSON');
        }
      } catch (error) {
        // seterror('Error fetching etablissement data:', error);
        // console.error('Error fetching etablissement data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [error]);

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
        seterror('Error fetching user data:');
        // console.error('Error fetching user data:', error);
      } finally {
      }
    };

    fetchData();
  }, [currentis, error]);

  const handleImageError = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    const fetchStudentList = async () => {
      try {
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
        <View id="click">
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
            <Text style={{fontSize: 20, color: 'black'}}>
              {studentList.map(student => {
                if (student.id_etudiant == currentis) {
                  const capitalized =
                    student.etudiant.charAt(0).toUpperCase() +
                    student.etudiant.slice(1);
                  return `${capitalized}`;
                }
              })}
            </Text>
            <TouchableOpacity onPress={toggleProfileMenu}>
              {curImage && (
                <Image
                  style={{width: 40, height: 40, borderRadius: 20}}
                  source={{
                    uri: `https://jyssrmmas.pythonanywhere.com/media/${curImage}`,
                  }}
                  onError={handleImageError} // Handle error event
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
                {/* 
                <TouchableOpacity onPress={handleLogout}>
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
          {loading ? ( // Render skeleton loading animation if loading state is true
            <View style={{marginTop: 40}}>
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item
                  flexDirection="row"
                  alignItems="center">
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={50}
                  />
                  <SkeletonPlaceholder.Item marginLeft={20}>
                    <SkeletonPlaceholder.Item
                      width={120}
                      height={20}
                      borderRadius={4}
                    />
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={80}
                      height={20}
                      borderRadius={4}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Etablissement');
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FEF4CD',
                  padding: 10,
                  borderRadius: 15,
                  marginTop: 50,
                }}>
                {etablissementData && (
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      alignSelf: 'center',
                      marginTop: 10,
                      borderRadius: 10,
                      objectFit: 'cover',
                    }}
                    source={{
                      uri:
                        'https://jyssrmmas.pythonanywhere.com/media/' +
                        etablissementData.image,
                    }}
                  />
                )}
                <View style={{width: 280}}>
                  <Text style={{marginLeft: 10, fontSize: 18, color: 'black'}}>
                    {etablissementData && etablissementData.nom_etablissement}
                  </Text>
                  <Text style={{marginLeft: 10, fontSize: 16, color: 'black'}}>
                    {etablissementData && etablissementData.ville}, Maroc
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              marginTop: 20,
              fontWeight: '500',
            }}>
            Profs
          </Text>
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
            <View style={{height: 'auto'}}>
              <ScrollView horizontal>
                {professors.map((prof, index) =>
                  index === 0 ? (
                    <ProfCard
                      key={index}
                      professor={prof}
                      id={prof[0].id_employe}
                    />
                  ) : (
                    <ProfCardSpace
                      key={index}
                      professor={prof}
                      id={prof[0].id_employe}
                    />
                  ),
                )}
              </ScrollView>
            </View>
          )}
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              marginTop: 20,
              fontWeight: '500',
            }}>
            Cours
          </Text>
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
            <View style={{height: 'auto'}}>
              <ScrollView horizontal>
                {courses.map((course, index) =>
                  index === 0 ? (
                    <CourseCard
                      key={index}
                      course={course}
                      id={course.id_cour}
                    />
                  ) : (
                    <CourseCardSpace
                      key={index}
                      course={course}
                      id={course.id_cour}
                    />
                  ),
                )}
              </ScrollView>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <Footer activeScreen={'Home'} />
    </SafeAreaView>
  );
}

export default Home;
