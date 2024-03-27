import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { getToken, storeToken, checkIfLoggedIn } from '../../utils/db'; // Importer la fonction checkIfLoggedIn

function Connexion({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const redirectionSiConnecte = async () => {
      const estConnecte = await checkIfLoggedIn(); // Vérifier si l'utilisateur est connecté
      if (estConnecte) {
        navigation.replace('Accueil'); // Rediriger vers PickStudent si l'utilisateur est déjà connecté
      }
    };

    redirectionSiConnecte(); // Appeler la fonction au montage du composant
  }, []); // Le tableau de dépendances vide assure que l'effet ne s'exécute qu'une seule fois au montage du composant

  const handleChangementEmail = text => {
    setEmail(text);
  };

  const handleChangementMotDePasse = text => {
    setPassword(text);
  };

  const handleConnexion = () => {
    if (!email || !password) {
      alert('Veuillez entrer votre email et votre mot de passe.');
      return;
    }

    setLoading(true); // Démarrer l'animation de chargement

    fetch('https://jyssrmmas.pythonanywhere.com/api/loginParent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(async data => {
        setLoading(false);
        if (data.success && data.token) {
          await storeToken(data.token, data.data[0]); // En supposant que data est un tableau avec un seul élément
          navigation.replace('PickStudent');
        } else {
          alert('La connexion a échoué. Veuillez vérifier vos identifiants.');
        }
      })
      .catch(error => {
        setLoading(false); // Arrêter l'animation de chargement
        console.error('Erreur :', error);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Image
          style={{ width: 250, height: 100, alignSelf: 'center', marginTop: 40 }}
          source={require('../../assets/home/Logo.png')}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre email"
            onChangeText={handleChangementEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Entrez votre mot de passe"
            onChangeText={handleChangementMotDePasse}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={handleConnexion}>
            <Text style={styles.button}>Connexion</Text>
          </TouchableOpacity>
          {/* <Text
            style={styles.orText}
            onPress={() => {
              navigation.navigate('ForgetPassword');
            }}>
            Mot de passe oublié
          </Text> */}
          <Text style={{ textAlign: 'center', marginTop: 50 }}>
            {/* Vos données en vous inscrivant à MMS, signifie que vous acceptez notre Politique de confidentialité et nos Conditions d'utilisation */}
          </Text>
        </View>
        {loading && (
          <ActivityIndicator
            style={{ marginTop: 20 }}
            size="large"
            color="black"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 45,
    color: 'black',
    fontWeight: '500',
    marginTop: 25,
  },
  titleLogin: {
    fontSize: 28,
    fontWeight: '400',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    marginTop: 5,
  },
  inputContainer: {
    marginTop: 80,
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
    color:'black'
  },
  button: {
    textAlign: 'center',
    height: 60,
    padding: 15,
    backgroundColor: '#59ADFE',
    marginTop: 10,
    color: 'white',
    borderRadius: 10,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 30,
  },
  orText: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
    letterSpacing: 0.8,
  },
  socialLoginContainer: {
    width: 'auto',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 0,
    height: 60,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  socialLoginText: {
    textAlign: 'center',
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
    fontSize: 16,
    color: 'blue',
  },
});

export default Connexion;
