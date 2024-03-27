import React from 'react';
import {Text} from 'react-native';

const CurrentDate = () => {
  // Obtenir la date actuelle
  const dateActuelle = new Date();
  // Obtenir le nom du mois
  const nomsMois = [
    'Jan',
    'Fév',
    'Mar',
    'Avr',
    'Mai',
    'Juin',
    'Juil',
    'Août',
    'Sep',
    'Oct',
    'Nov',
    'Déc',
  ];
  const nomMois = nomsMois[dateActuelle.getMonth()];

  // Obtenir le jour de la semaine
  const joursSemaine = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  const jourSemaine = joursSemaine[dateActuelle.getDay()];

  // Obtenir l'année
  const annee = dateActuelle.getFullYear();

  // Formater la date comme souhaité
  const dateFormatee = `${nomMois}, ${jourSemaine} ${annee}`;

  return <Text>{dateFormatee}</Text>;
};

export default CurrentDate;
