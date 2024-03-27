import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function MotDePasseOublie({ navigation }) {
  const [email, setEmail] = useState('');

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handleResetPassword = () => {
    // Implémentez ici la logique de réinitialisation du mot de passe
    console.log('Demande de réinitialisation du mot de passe pour l\'adresse e-mail :', email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mot de passe oublié</Text>
      <Text style={styles.subtitle}>
        Veuillez entrer votre adresse e-mail pour réinitialiser votre mot de passe.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre adresse e-mail"
          onChangeText={handleEmailChange}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handleResetPassword}>
          <Text style={styles.button}>Réinitialiser le mot de passe</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBack}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
    marginTop: 70,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    marginTop: 5,
  },
  inputContainer: {
    marginTop: 30,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#324EFF',
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
    backgroundColor: 'red',
    marginTop: 10,
    color: 'white',
    borderRadius: 10,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 30,
  },
  goBack: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
});

export default MotDePasseOublie;
