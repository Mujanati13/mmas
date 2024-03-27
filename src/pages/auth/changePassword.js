import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {getUserData} from '../../utils/db';

export function ChangePassword({navigation}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idParent, setIdParent] = useState(null);
  const [oldPassword, setOldPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data from API
        const idParentData = await getUserData();
        setIdParent(idParentData.id_parent); // Set the idParent state
        const response = await fetch(
          'https://jyssrmmas.pythonanywhere.com/api/Parentt/',
        );
        const userDataJson = await response.json();
        if (userDataJson && userDataJson.data && userDataJson.data.length > 0) {
          const userData = userDataJson.data.find(
            item => item.id_parent === idParentData.id_parent,
          );
          setUserData({...userData, id_parent: idParentData.id_parent}); // Set the userData state including id_parent
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const checkOldPassword = async () => {
    try {
      const parentData = await getUserData();
      const response = await fetch(
        'https://jyssrmmas.pythonanywhere.com/api/loginParent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: parentData.mail,
            password: oldPassword,
          }),
        },
      );
      const res = await response.json();
      if (!res.success) {
        // Old password is incorrect
        Alert.alert('Ancien mot de passe incorrect.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking old password:', error);
      Alert.alert(
        "Une erreur s'est produite lors de la vérification de l'ancien mot de passe.",
      );
      return false;
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      // Check if any of the required fields are empty
      if (!userData.nom || !userData.prenom || !userData.mail) {
        Alert.alert('Veuillez remplir tous les champs.');
        setLoading(false);
        return;
      }
      const status = await checkOldPassword();
      if (status == false) {
        Alert.alert('Ancien mot de passe incorect');
        return;
      }
      const response = await fetch(
        `https://jyssrmmas.pythonanywhere.com/api/Parentt/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        },
      );
      if (response.ok) {
        // Optionally, handle success scenario here
        Alert.alert('Profil utilisateur mis à jour avec succès');
        navigation.navigate('Home');
      } else {
        Alert.alert('Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeText = (key, value) => {
    setUserData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  if (false) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              style={{width: 40, height: 40, opacity: 0.3}}
              source={require('../../assets/home/GoBackb.png')}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 20, color: 'black', marginLeft: 10}}>
            Modifier le mot de passe
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ancien mot de passe"
            onChangeText={setOldPassword}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Nouveau mot de passe"
            onChangeText={value => handleChangeText('password', value)}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={handleUpdateProfile}>
            <Text style={styles.button}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  titleLogin: {
    fontSize: 28,
    fontWeight: '400',
    marginTop: 20,
    color: 'black',
  },
  inputContainer: {
    marginTop: 30,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0FAE0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 60,
    fontSize: 15,
    marginTop: 10,
  },
  button: {
    textAlign: 'center',
    height: 60,
    padding: 15,
    backgroundColor: '#009CC6',
    marginTop: 40,
    color: 'white',
    borderRadius: 10,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 30,
  },
});
