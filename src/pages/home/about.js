import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function About({navigation}) {
  const [appVersion, setAppVersion] = useState(null);

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
  return (
    <ScrollView>
      <SafeAreaView
        style={{
          padding: 20,
          paddingTop: 20,
          flex: 1,
          backgroundColor: 'white',
        }}>
        {true && (
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
                à propos
              </Text>
            </View>
            <View style={{marginTop: 20, paddingLeft: 5}}>
              <Text style={{fontWeight: 600, color: 'black', fontSize: 20}}>
                À propos de MMAS Meet me after school
              </Text>
              <Text style={{fontSize: 18, marginTop: 5}}>
                Bienvenue sur MMAS, l'application développée par JYSSR-Connect
                pour simplifier votre expérience scolaire en dehors des heures
                de cours.
              </Text>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 19, color: 'black'}}>
                  Plate-forme :
                </Text>
                <Text style={{marginLeft: 5, fontSize: 19}}>
                  Disponible sur iOS et Android
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 19, color: 'black'}}>
                  Mise en production le:
                </Text>
                <Text style={{marginLeft: 5, fontSize: 19}}>20/03/2023</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 19, color: 'black'}}>Version :</Text>
                <Text style={{marginLeft: 5, fontSize: 19}}>{appVersion&&appVersion}</Text>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '600',
                  marginTop: 5,
                }}>
                Notre Mission
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 5,
                }}>
                Meet me After School est un organisme de soutien scolaire qui
                s’adresse à tous les élèves… Ceux qui butent dans
                l’apprentissage d’une matière et ceux qui se heurtent au système
                scolaire ou aux méthodes de travail proposées. Ou encore ceux
                qui veulent améliorer leur dossier scolaire pour pouvoir
                intégrer la filière de leur choix.
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 5,
                }}>
                Et même ceux qui visent l’excellence : grandes écoles ou
                universités réputées en France ou à l’étranger. À chacun d’eux,
                nous proposons des solutions pédagogiques personnalisées pour
                les aider à développer leur potentiel.
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '600',
                  marginTop: 5,
                }}>
                Fonctionnalités Principales{' '}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 19, color: 'black'}}>
                  1. Consultation du planning
                </Text>
                <Text style={{marginLeft: 5, fontSize: 19}}>
                  Accédez facilement à votre emploi du temps pour rester
                  organisé(e) et ne manquez jamais une séance.
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 19, color: 'black'}}>
                  2. Réservation des cours
                </Text>
                <Text style={{marginLeft: 5, fontSize: 19}}>
                  Planifiez vos sessions d'étude en réservant des créneaux
                  horaires, garantissant ainsi une utilisation efficace de votre
                  temps après l'école.
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 7,
                }}>
                <Text style={{fontSize: 19, color: 'black'}}>
                  3. Contacter l'administration
                </Text>
                <Text style={{marginLeft: 5, fontSize: 19}}>
                  Besoin d'aide ou de clarifications ? Utilisez notre fonction
                  de messagerie intégrée pour contacter rapidement
                  l'administration.
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '600',
                  marginTop: 5,
                }}>
                L'Équipe JYSSR-Connect{' '}
              </Text>
              <Text style={{fontSize: 18, marginTop: 5}}>
                Notre équipe dévouée de développeurs travaille sans relâche pour
                améliorer constamment MMAS. Nous nous efforçons de créer une
                application intuitive, sûre et efficace pour répondre à vos
                besoins.
              </Text>
              <Text style={{fontSize: 18, marginTop: 5}}>
                La sécurité de vos données est notre priorité. MMAS utilise des
                protocoles de sécurité avancés pour protéger vos informations
                personnelles et garantir une expérience utilisateur en toute
                confiance.
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '600',
                  marginTop: 5,
                }}>
                Contact{' '}
              </Text>
              <Text style={{fontSize: 18, marginTop: 5}}>
                Nous sommes ouverts à vos commentaires et suggestions ! Si vous
                avez des idées pour améliorer MMAS ou rencontrez des problèmes
                techniques, n'hésitez pas à nous contacter à
                <Text style={{color: 'blue'}}> support@jyssr-connect.com</Text>.
              </Text>
              <Text style={{fontSize: 18, marginTop: 5}}>
                Merci de faire partie de la communauté MMAS !
              </Text>
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

export default About;
