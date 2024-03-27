import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function Etablissement({navigation}) {
  const [etablissementData, setEtablissementData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jyssrmmas.pythonanywhere.com/api/etablissements/',
        );
        const data = await response.json();
        // Assuming the API response is an array of etablissement objects
        console.log(data);
        setEtablissementData(data.data[0]); // Assuming you want to display the first etablissement
      } catch (error) {
        // console.error('Error fetching etablissement data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 20,
        paddingTop: 30,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          style={{width: 40, height: 40, opacity: 0.5}}
          source={require('../../assets/home/GoBackb.png')}
        />
      </TouchableOpacity>
      <Text style={{fontSize: 30, color: 'black', marginTop: 20}}>
        {etablissementData && etablissementData.nom_etablissement}
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : etablissementData ? (
        <>
          <ScrollView>
            <View
              style={{
                width: 'auto',
                height: 250,
                backgroundColor: '#fff',
                marginTop: 30,
                borderRadius: 15,
              }}>
              {/* Assuming etablissementData has an image URL */}
              <Image
                style={{
                  width: 350,
                  height: 230,
                  alignSelf: 'center',
                  marginTop: 10,
                  borderRadius: 20,
                }}
                source={{
                  uri:
                    'https://jyssrmmas.pythonanywhere.com/media/' +
                    etablissementData.image,
                }}
              />
            </View>
            <Text style={{fontSize: 25, color: 'black', marginTop: 20}}>
              Description
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 20,
                fontWeight: 300,
                lineHeight: 25,
              }}>
              {etablissementData.description}
            </Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `${Linking.openURL(`tel:${etablissementData.teletablissement}`)}`,
                )
              }>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 40,
                }}>
                <Image source={require('../../assets/home/Phone.png')}></Image>
                <Text style={{fontSize: 20, marginLeft: 10}}>
                  {etablissementData.teletablissement}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/maps/place/Mmas+-+Meet+Me+After+School/@35.7771778,-5.8020478,15z/data=!4m6!3m5!1s0xd0c7f4e6efc8cbb:0x787e557dc5ca320f!8m2!3d35.7771778!4d-5.8020478!16s%2Fg%2F11spxs_8mt?entry=ttu`,
                )
              }>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Image
                  source={require('../../assets/home/Location.png')}></Image>
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    color: 'blue',
                    opacity: 0.7,
                  }}>
                  {etablissementData.ville} -{' '}
                  {etablissementData.adresse_etablissement}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Image source={require('../../assets/home/Internet.png')}></Image>
              <View style={{fontSize: 20, marginLeft: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`${etablissementData.sitewebetablissement}`)
                  }>
                  <Text style={{fontSize: 20, color: 'blue', opacity: 0.7}}>
                    {' '}
                    {etablissementData.sitewebetablissement}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{fontSize: 25, color: 'black', marginTop: 30}}>
              Social Media
            </Text>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: '',
              }}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`${etablissementData.facebook}`)
                }>
                <Image
                  style={{marginTop: 30, width: 55, height: 56}}
                  source={require('../../assets/home/Facebook.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`${etablissementData.instagrame}`)
                }>
                <Image
                  style={{marginTop: 30, width: 45, height: 45, marginLeft: 20}}
                  source={require('../../assets/home/Instagram.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`https://wa.me/${etablissementData.watsapp}`)
                }>
                <Image
                  style={{marginTop: 30, width: 60, height: 60, marginLeft: 20}}
                  source={require('../../assets/home/whatsapp.png')}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      ) : (
        <Text>No etablissement data available</Text>
      )}
    </SafeAreaView>
  );
}

export default Etablissement;
