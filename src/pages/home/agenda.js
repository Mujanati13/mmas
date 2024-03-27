import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/fr'; // French locale for moment.js
import {LocaleConfig} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

const MyAgenda = ({id}) => {
  const [oldEvents, setOldEvents] = useState(null);
  const [newEvents, setNewEvents] = useState(null);
  const [oldAgendaId, setOldAgendaId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventsForWeek = async () => {
      try {
        const startOfWeek = moment().startOf('week');
        const endOfWeek = moment().endOf('week');
        const weekStartDateString = startOfWeek.format('YYYY-MM-DD');
        const weekEndDateString = endOfWeek.format('YYYY-MM-DD');

        // Check if events for the current week are already stored locally
        const storedEventsString = await AsyncStorage.getItem('events');
        const storedEvents = storedEventsString
          ? JSON.parse(storedEventsString)
          : {};

        if (
          storedEvents[weekStartDateString] &&
          storedEvents[weekEndDateString]
        ) {
          setOldEvents(storedEvents);
          setOldAgendaId(storedEvents['id']);
        }

        const fetchedEvents = {};

        // Fetch events for each day of the current week
        for (
          let date = moment(startOfWeek);
          date <= endOfWeek;
          date.add(1, 'day')
        ) {
          const isoDate = date.format('YYYY-MM-DD');
          const isCurrentDay = date.isSame(moment(), 'day'); // Check if current date matches the iteration date

          const response = await fetch(
            `https://jyssrmmas.pythonanywhere.com/api/sean_by_id_etudiant_jour/?id_etudiant=${id}&jour=${date.isoWeekday()}`,
          );

          if (!response.ok) {
            if (response.status === 500) {
              setError(
                `Failed to fetch events for ${isoDate}: Internal Server Error`,
              );
            } else {
              setError(
                `Failed to fetch events for ${isoDate}: ${response.status}`,
              );
            }
            continue; // Skip to the next iteration
          }

          try {
            const data = await response.json();
            const eventData = data.data.map(item => ({
              date: isoDate,
              day: date.format('dddd'),
              title: item.nom_seance,
              heure_debut: moment(item.heure_debut, 'HH:mm:ss').format('HH:mm'),
              heure_fin: moment(item.heure_fin, 'HH:mm:ss').format('HH:mm'), // Format time to 12-hour with AM/PM
            }));

            // Add event data only if it doesn't exist for the current date
            if (!fetchedEvents[isoDate]) {
              fetchedEvents[isoDate] = eventData;
            } else {
              fetchedEvents[isoDate] = fetchedEvents[isoDate].concat(eventData);
            }

            // If no event data fetched for the current day, set a default event
            if (isCurrentDay && eventData.length === 0) {
              const defaultEvent = {
                date: isoDate,
                day: '',
                title: 'Aucun événement',
                heure_debut: '', // Set default start time
                heure_fin: '', // Set default end time
              };
              if (!fetchedEvents[isoDate]) {
                fetchedEvents[isoDate] = [defaultEvent];
              } else {
                fetchedEvents[isoDate].push(defaultEvent);
              }
            }
          } catch (error) {
            setError(`Error parsing JSON for ${isoDate}: ${error.message}`);
          }
        }

        // Store fetched events locally
        await AsyncStorage.setItem(
          'events',
          JSON.stringify({...fetchedEvents, id}),
        );
        setNewEvents(fetchedEvents);
      } catch (error) {
        setError(`Error fetching events: ${error.message}`);
      }
    };

    fetchEventsForWeek();
  }, [id, error]); // Re-fetch events if the id prop changes

  const loadItemsForMonth = day => {
    // You can implement this function to load items for the month as needed.
    // This function will be called when the calendar view changes to a different month.
    // You can fetch data for the new month here.
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={{...oldEvents, ...newEvents}}
        loadItemsForMonth={loadItemsForMonth}
        refreshing={refreshing}
        hideExtraDays={true}
        firstDay={1}
        selected={new Date(moment().startOf('week'))}
        monthFormat="yyyy MM"
        maxDate={new Date(moment().endOf('week').subtract(1, 'day'))}
        minDate={new Date(moment(moment().startOf('week')))}
        disableAllTouchEventsForDisabledDays={true}
        renderItem={(item, firstItemInDay) => (
          <View style={styles.item}>
            {true && (
              <View style={styles.dateContainer}>
                <Text style={styles.date}>
                  {item.heure_debut} - {item.heure_fin}
                </Text>
                <Text style={styles.day}>{item.day}</Text>
              </View>
            )}
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#B7DCFE',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  dateContainer: {
    alignItems: 'flex-start',
    marginBottom: 5,
    color:'black'
  },
  date: {
    fontSize: 16,
    fontWeight: '400',
    color:'black',
    opacity:0.7

  },
  day: {
    fontSize: 15,
    color: 'grey',
    color:'black',
    opacity:0.8

  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'auto',
    color:'black'
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MyAgenda;
