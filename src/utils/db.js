import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native';
// Function to store the token and user data securely in AsyncStorage
const storeToken = async (token, userdata) => {
  try {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('userdata', JSON.stringify(userdata));
    console.log('Token and userdata stored successfully.');
  } catch (error) {
    console.error('Error storing token and userdata:', error);
    throw new Error('An error occurred while storing the token and userdata.');
  }
};

const storeIdstudent = async id => {
  try {
    // Convert id to a string before storing
    const idString = String(id);
    await AsyncStorage.setItem('selectedStudentId', idString);
    console.log('id stored successfully.');
  } catch (error) {
    console.error('Error storing token and userdata:', error);
    throw new Error('An error occurred while storing the token and userdata.');
  }
};

const getStudentId = async () => {
  try {
    const id = await AsyncStorage.getItem('selectedStudentId');
    return id;
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw new Error('An error occurred while retrieving the token.');
  }
};

// Function to retrieve the token from AsyncStorage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw new Error('An error occurred while retrieving the token.');
  }
};

// Function to retrieve the user data from AsyncStorage
const getUserData = async () => {
  try {
    const userdataJSON = await AsyncStorage.getItem('userdata');
    return JSON.parse(userdataJSON);
  } catch (error) {
    console.error('Error retrieving userdata:', error);
    throw new Error('An error occurred while retrieving the userdata.');
  }
};

// Function to delete the token and user data from AsyncStorage
const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userdata');
    console.log('Token and userdata deleted successfully.');
  } catch (error) {
    console.error('Error deleting token and userdata:', error);
    throw new Error('An error occurred while deleting the token and userdata.');
  }
};

const checkIfLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('====================================');
    console.log(token);
    console.log('====================================');
    if (token && token.length != 0) {
      return true;
    } else {
      return false; // Return true if token exists, false otherwise
    }
  } catch (error) {
    console.error('Error checking if user is logged in:', error);
    return false; // Return false if an error occurs
  }
};

const logout = async () => {
  // Function to logout by deleting all relevant AsyncStorage data
  try {
    // Delete token, userdata, selectedStudentId, uniqueProfIds, selectedProf, and CourseIdSelect
    await AsyncStorage.multiRemove([
      'token',
      'userdata',
      'selectedStudentId',
      'uniqueProfIds',
      'selectedProf',
      'CourseIdSelect',
    ]);
    // Add any additional logout logic here, such as navigating to the login screen
    console.log('Logout successful. All data deleted.');
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error('An error occurred while logging out.');
  }
};

const getIdParent = async () => {
  try {
    const userdataJSON = await AsyncStorage.getItem('userdata');
    const userdata = JSON.parse(userdataJSON);
    if (userdata && userdata.data && userdata.data.length > 0) {
      return userdata.data[0].id_parent;
    } else {
      throw new Error('User data not found or malformed.');
    }
  } catch (error) {
    console.error('Error retrieving id_parent:', error);
    throw new Error('An error occurred while retrieving id_parent.');
  }
};

const storeStudentData = async data => {
  try {
    // Convert the data object to a string before storing it
    const dataString = JSON.stringify(data);
    await AsyncStorage.setItem('studentData', dataString);
    console.log('Student data stored successfully.');
  } catch (error) {
    console.error('Error storing student data:', error);
    throw new Error('An error occurred while storing student data.');
  }
};

// Function to store unique professor IDs in AsyncStorage
async function storeUniqueProfIds(uniqueProfIds) {
  try {
    // Convert the array to a string before storing it in AsyncStorage
    const idsString = JSON.stringify(uniqueProfIds);
    await AsyncStorage.setItem('uniqueProfIds', idsString);
    console.log('Unique professor IDs stored successfully!');
  } catch (error) {
    console.error('Error storing unique professor IDs:', error);
  }
}

// Function to retrieve unique professor IDs from AsyncStorage
async function getUniqueProfIds() {
  try {
    // Retrieve the string from AsyncStorage
    const idsString = await AsyncStorage.getItem('uniqueProfIds');
    if (idsString !== null) {
      // Convert the string back to an array
      const uniqueProfIds = JSON.parse(idsString);
      console.log(
        'Unique professor IDs retrieved successfully:',
        uniqueProfIds,
      );
      return uniqueProfIds;
    } else {
      console.log('No unique professor IDs found in AsyncStorage');
      return []; // Return an empty array if no data is found
    }
  } catch (error) {
    console.error('Error retrieving unique professor IDs:', error);
    return []; // Return an empty array in case of an error
  }
}

const storeIdProf = async id => {
  try {
    // Convert id to a string before storing
    const idString = String(id);
    await AsyncStorage.setItem('selectedProf', idString);
    console.log('id Prof successfully. ' + idString);
  } catch (error) {
    console.error('Error storing token and userdata:', error);
    throw new Error('An error occurred while storing the token and userdata.');
  }
};
const getProfId = async () => {
  try {
    const id = await AsyncStorage.getItem('selectedProf');
    return id;
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw new Error('An error occurred while retrieving the token.');
  }
};

const storeIdCourse = async id => {
  try {
    // Convert id to a string before storing
    const idString = String(id);
    await AsyncStorage.setItem('CourseIdSelect', idString);
    console.log('id Course successfully. ' + idString);
  } catch (error) {
    console.error('Error storing token and userdata:', error);
    throw new Error('An error occurred while storing the token and userdata.');
  }
};
const getCoursefId = async () => {
  try {
    const id = await AsyncStorage.getItem('CourseIdSelect');
    return id;
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw new Error('An error occurred while retrieving the token.');
  }
};

const storeIdStudentProfile = async id => {
  try {
    const idString = String(id);
    await AsyncStorage.setItem('storeIdStudentProfile', idString);
    console.log('id Course successfully. ' + idString);
  } catch (error) {
    console.error('Error storing token and userdata:', error);
    throw new Error('An error occurred while storing the token and userdata.');
  }
};
const getstoreIdStudentProfile = async () => {
  try {
    const id = await AsyncStorage.getItem('storeIdStudentProfile');
    return id;
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw new Error('An error occurred while retrieving the token.');
  }
};

const storeIdNotification = async id => {
  try {
    const idString = String(id);
    await AsyncStorage.setItem('storeIdNotification', idString);
    console.log('id Course successfully. ' + idString);
  } catch (error) {
    console.error('Error storing token and userdata:', error);
    throw new Error('An error occurred while storing the token and userdata.');
  }
};
const getstoreIdNotification = async () => {
  try {
    const id = await AsyncStorage.getItem('storeIdNotification');
    return id;
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw new Error('An error occurred while retrieving the token.');
  }
};

const CurrentDatPluse = date => {
  // Obtenir la date actuelle
  const dateActuelle = new Date(date);
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

function formatTimeWithAMPM(dates) {
  // Get hours and minutes from the date object

  const date = new Date(dates);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine if it's AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12;

  // Add leading zeros to minutes if necessary
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Combine hours, minutes, and period into a formatted string
  const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

  return formattedTime;
}

const splitTextWithEllipsis = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    const firstPart = text.substring(0, maxLength - 3); // Subtract 3 for the "..." at the end
    return `${firstPart}...`;
  }
};

const updateToken = async (token, id) => {
  console.log(token , id );
  try {
    const response = await fetch(
      'https://jyssrmmas.pythonanywhere.com/api/update_notification_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          user_id: id,
        }),
      },
    );

    if (response.ok) {
      console.log('Token updated ++++++++++++++++');
    } else {
      throw new Error('Failed to update token');
    }
  } catch (error) {
    console.error('Error updating token:', error);
  }
};

const addNotification = async () => {
  try {
    let count = await AsyncStorage.getItem('count_notification');
    count = count ? parseInt(count, 10) : 0;
    count++;
    await AsyncStorage.setItem('count_notification', count.toString());
  } catch (error) {
    console.error('Error adding notification:', error);
  }
};

const removeNotification = async () => {
  try {
    let count = await AsyncStorage.getItem('count_notification');
    count = count ? parseInt(count, 10) : 0;
    if (count > 0) {
      count--;
      await AsyncStorage.setItem('count_notification', count.toString());
    }
  } catch (error) {
    console.error('Error removing notification:', error);
  }
};

const getNotificationCount = async () => {
  try {
    const count = await AsyncStorage.getItem('count_notification');
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.error('Error getting notification count:', error);
    return 0;
  }
};

const formatDate = dateString => {
  // Define French day names
  const frenchDays = [
    'dimanche',
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
  ];

  // Define French month names
  const frenchMonths = [
    'janv',
    'févr',
    'mars',
    'avr',
    'mai',
    'juin',
    'juil',
    'août',
    'sept',
    'oct',
    'nov',
    'déc',
  ];

  const date = new Date(dateString);
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const month = frenchMonths[monthIndex]; // Get French month name
  const dayIndex = date.getDay();
  const day = frenchDays[dayIndex]; // Get French day name
  const dayOfMonth = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${dayOfMonth}/${monthIndex}/${year}`;
};

const calculateTimeDifference = (dateNotification) => {
  const dateActuelle = new Date();
  const diff = dateActuelle - new Date(dateNotification);
  const minutesDiff = Math.floor(diff / (1000 * 60));
  if (minutesDiff < 60) {
    return `Il y a ${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''}`;
  } else if (minutesDiff < 1440) {
    const heuresDiff = Math.floor(minutesDiff / 60);
    return `Il y a ${heuresDiff} heure${heuresDiff !== 1 ? 's' : ''}`;
  } else if (minutesDiff < 43200) {
    const joursDiff = Math.floor(minutesDiff / 1440);
    return `Il y a ${joursDiff} jour${joursDiff !== 1 ? 's' : ''}`;
  } else if (minutesDiff < 525600) {
    const moisDiff = Math.floor(minutesDiff / 43200);
    return `Il y a ${moisDiff} mois`;
  } else {
    const anneesDiff = Math.floor(minutesDiff / 525600);
    return `Il y a ${anneesDiff} an${anneesDiff !== 1 ? 's' : ''}`;
  }
};




export {
  calculateTimeDifference,
  formatDate,
  getstoreIdNotification,
  storeIdNotification,
  getNotificationCount,
  addNotification,
  removeNotification,
  updateToken,
  splitTextWithEllipsis,
  formatTimeWithAMPM,
  CurrentDatPluse,
  storeToken,
  getToken,
  getUserData,
  deleteToken,
  checkIfLoggedIn,
  logout,
  getIdParent,
  storeIdstudent,
  getStudentId,
  storeStudentData,
  storeUniqueProfIds,
  getUniqueProfIds,
  storeIdProf,
  getProfId,
  storeIdCourse,
  getCoursefId,
  storeIdStudentProfile,
  getstoreIdStudentProfile,
};
