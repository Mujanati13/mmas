import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CurrentDate from '../../utils';
import {PickStudentCard} from '../../components/home';
import {CurrentDatPluse, formatDate, getUserData, storeIdstudent, storeStudentData} from '../../utils/db';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import getNewFCMToken from '../../utils/notifications';

function ChoisirEtudiant({navigation}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idParent, setIdParent] = useState(null); // État pour stocker id_parent
  const [studentList, setStudentList] = useState([]); // État pour stocker la liste des étudiants
  const [selectedStudentId, setSelectedStudentId] = useState(null); // État pour stocker l'ID de l'étudiant sélectionné
  const [appVersion, setAppVersion] = useState(null);

  // Fonction pour gérer le clic sur la carte d'étudiant
  const handleStudentClick = async studentId => {
    await storeIdstudent(studentId);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
        // Définir id_parent dans l'état
        if (data) {
          setIdParent(data.id_parent);
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données utilisateur :',
          error,
        );
        // Gérer l'erreur
      }
    };

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
          console.log(JSON.stringify(data) + " belll");
          setStudentList(data.data);
          await storeStudentData(data.data);
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
    fetchUserData();
    getNewFCMToken()
  }, [idParent]);

  useEffect(() => {
    fetchAppVersion();
  }, []);

  const fetchAppVersion = async () => {
    try {
      const response = await fetch(
        'https://jyssrmmas.pythonanywhere.com/api/get_version',
      );
      const data = await response.json();
      setAppVersion(data.data.version);
    } catch (error) {
      console.error('Error fetching app version:', error);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#FF9900" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        padding: 20,
        paddingTop: 30,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 3,
        }}>
        <Text style={{fontSize: 20, color: 'black'}}>Aujourd'hui </Text>
        <Text style={{marginLeft: 5}}>{formatDate(new Date())}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
        }}>
        <Image
          style={{width: 30, height: 30 , transform: [{ rotate: '180deg' }]}}
          source={require('../../assets/home/HandCursor.png')}
        />
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: '500',
            marginLeft: 15,
          }}>
          Sélectionner l'étudiant
        </Text>
      </View>
      <View style={{marginTop: 10}}></View>
      <View style={{marginTop: 10}}></View>
      <ScrollView>
        {studentList.map((student, index) => (
          <TouchableOpacity
            key={student.id_etudiant}
            onPress={() => {
              handleStudentClick(student.id_etudiant);
            }}>
            <PickStudentCard
              key={student.id_etudiant}
              student={student}
              id={student.id_etudiant}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* <View
        style={{
          width: 'auto',
          height: 60,
          backgroundColor: '#415DBD',
          marginTop: 70,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '600',
            textAlign: 'center',
            textAlignVertical: 'center',
            paddingTop: 12,
            color: 'white',
            letterSpacing: 0.8,
          }}>
          Profil
        </Text>
      </View> */}
      <Text style={{textAlign: 'center'}}>version {appVersion}</Text>
    </SafeAreaView>
  );
}

export default ChoisirEtudiant;
