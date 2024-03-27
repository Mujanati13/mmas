import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Agenda, AgendaList} from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/fr';
import {LocaleConfig} from 'react-native-calendars';

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

export const AgendaPresenece = ({id}) => {
  const [presenceData, setPresenceData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [error, setError] = useState(true);
  const [selectDay, setSelectDay] = useState(null);

  function getEarliestDateWithData(data) {
    // Filter out default events and get unique dates
    const uniqueDates = [...new Set(data.map(item => item.date))];

    // Sort dates in ascending order
    uniqueDates.sort((a, b) => new Date(a) - new Date(b));

    // Find the first date with data
    for (const date of uniqueDates) {
      const eventsForDate = data.filter(item => item.date === date);
      if (eventsForDate.length > 0) {
        setSelectDay(date);
        break;
      }
    }

    return null; // Return null if no date with data is found
  }

  useEffect(() => {
    const fetchPresenceData = async () => {
      try {
        const response = await fetch(
          `https://jyssrmmas.pythonanywhere.com/api/Presenceparsemaine/?id_etd=${id}`,
        );
        const data = await response.json();
        if (response.ok) {
          const presenceEventData = data.data.map(item => ({
            id: item.id_presence,
            date: moment(item.date_presence).format('YYYY-MM-DD'),
            startTime: moment(item.heure_debut, 'HH:mm:ss').format('HH:mm'),
            endTime: moment(item.heure_fin, 'HH:mm:ss').format('HH:mm'),
            title: item.cours,
            presence: item.presence,
            motif: item.motif_annulation,
          }));

          getEarliestDateWithData(presenceEventData);

          const groupedPresenceData = presenceEventData.reduce((acc, event) => {
            const {date, ...eventData} = event;
            acc[date] = acc[date] || [];
            acc[date].push(eventData);
            return acc;
          }, {});

          setPresenceData(groupedPresenceData);

          // Check if presence data for the current date exists
          const currentDate = moment().format('YYYY-MM-DD');
          if (
            !groupedPresenceData[currentDate] ||
            groupedPresenceData[currentDate].length === 0
          ) {
            // If no presence data for the current date, set a default presence item
            setPresenceData(prevData => ({
              ...prevData,
              [currentDate]: [
                {
                  id: 'default',
                  date: currentDate,
                  startTime: '', // Set default start time
                  endTime: '', // Set default end time
                  title: 'Aucun événement',
                  presence: 'ss', // Assuming default event is present
                  motif: '',
                },
              ],
            }));
            setHasData(true); // Set hasData to true when default data is set
          } else {
            setHasData(true); // Set hasData to true when data is available
          }
        } else {
          // console.error('Failed to fetch presence data:', response.status);
          setError('Failed to fetch presence data,' + response.status);
          setHasData(false); // Set hasData to false when fetching fails
        }
      } catch (error) {
        // console.error('Error fetching presence data:', error);
        setError('Failed to fetch presence data,' + error);
        setHasData(false); // Set hasData to false when fetching fails
      }
    };

    fetchPresenceData();
  }, [error]);

  const fetchPresenceDataForDate = async date => {
    try {
      const response = await fetch(
        `https://jyssrmmas.pythonanywhere.com/api/Presenceparsemaine2/?id_etd=${id}&date_presence=${date}`,
      );
      const data = await response.json();
      console.log(JSON.stringify(data));
      if (response.ok) {
        if (data.data && data.data.length > 0) {
          processData(data);
        } else {
          // If API returns empty data, add default event
          setPresenceData(prevData => ({
            ...prevData,
            [date]: [
              {
                id: 'default',
                date: date,
                startTime: '',
                endTime: '',
                title: 'Aucun événement',
                presence: 'ff',
                motif: '',
              },
            ],
          }));
        }
      } else {
        setError('Failed to fetch presence data,' + response.status);
      }
    } catch (error) {
      setError('Failed to fetch presence data,' + error);
      setHasData(false);
    }
  };

  const processData = data => {
    const presenceEventData = data.data.map(item => ({
      id: item.id_presence,
      date: moment(item.date_presence).format('YYYY-MM-DD'),
      startTime: moment(item.heure_debut, 'HH:mm:ss').format('HH:mm'),
      endTime: moment(item.heure_fin, 'HH:mm:ss').format('HH:mm'),
      title: item.cours,
      presence: item.presence,
      motif: item.motif_annulation,
    }));

    const groupedPresenceData = presenceEventData.reduce((acc, event) => {
      const {date, ...eventData} = event;
      acc[date] = acc[date] || [];
      acc[date].push(eventData);
      return acc;
    }, {});

    setPresenceData(prevData => {
      // Merge the old data with the new grouped presence data
      const newData = {...prevData, ...groupedPresenceData};
      return newData;
    });
    const currentDate = moment().format('YYYY-MM-DD');
    if (
      !groupedPresenceData[currentDate] ||
      groupedPresenceData[currentDate].length === 0
    ) {
      setPresenceData(prevData => ({
        ...prevData,
        [currentDate]: [
          {
            id: 'default',
            date: currentDate,
            startTime: '',
            endTime: '',
            title: 'Aucun événement',
            presence: 'kk',
            motif: '',
          },
        ],
      }));
      setHasData(true);
    } else {
      setHasData(true);
    }
  };

  const markedDates = {};
  // Iterate through presenceData to mark dates based on presence or absence
  for (const date in presenceData) {
    let hasPresence = false;
    let hasAbsence = false;

    for (const event of presenceData[date]) {
      if (event.presence == true) {
        hasPresence = true;
      } else if (event.presence == false) {
        hasAbsence = true;
      }
    }

    if (hasPresence == true && hasAbsence == true) {
      markedDates[date] = {marked: true, selectedColor: 'orange'}; // Both presence and absence on the same date
    } else if (hasPresence == true) {
      markedDates[date] = {marked: true, selectedColor: 'green'}; // Presence only
    } else if (hasAbsence == true) {
      markedDates[date] = {marked: true, selectedColor: 'red'}; // Absence only
    }
  }

  let selectedAgendaData;
  for (const date in presenceData) {
    const events = presenceData[date];
    if (events && events.length > 0 && events[0].id !== 'default') {
      selectedAgendaData = events;
      break;
    }
  }

  // Render Agenda only if data is available for the current date
  return (
    <View style={styles.container}>
      {true && (
        <Agenda
          items={presenceData}
          markedDates={markedDates}
          selected={selectDay && selectDay}
          loadItemsForMonth={() => {}}
          scrollToNextEvent={true}
          onDayPress={day => {
            const selectedDate = moment(day.dateString).format('YYYY-MM-DD');
            if (presenceData[selectedDate]) {
              // Check if data for the selected date already exists
              console.log('Data already exists for', selectedDate);
            } else {
              // Data doesn't exist, fetch it or handle accordingly
              fetchPresenceDataForDate(day.dateString);
              console.log('Fetching data for', selectedDate);
              // You can decide here whether to fetch data or show a message that no data is available for the selected date
            }
          }}
          refreshing={refreshing}
          pastScrollRange={50}
          hideExtraDays={true}
          maxDate={new Date(moment().endOf('day').subtract(1, 'day'))}
          minDate={new Date(moment().startOf('month').subtract(300, 'day'))}
          renderItem={(item, firstItemInDay) => (
            <View style={styles.item}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={[
                    styles.circle,
                    item.id !== 'default' && {
                      backgroundColor: item.presence == true ? 'green' : 'red',
                    },
                  ]}
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text
                  style={
                    styles.time
                  }>{`${item.startTime} - ${item.endTime}`}</Text>
              </View>
              {item.motif.length > 0 && (
                <View style={{padding: 0, marginTop: 7}}>
                  {true && (
                    <Text style={{color: 'black'}}>Motif d'absence</Text>
                  )}
                  <Text style={{}}>{`${item.motif && item.motif}`}</Text>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color:'black'
  },
  time: {
    fontSize: 14,
    color: 'grey',
    marginTop: 5,
    marginLeft: 7,
    color:'black',
    opacity:0.8
  },
  circle: {
    width: 13,
    height: 13,
    borderRadius: 10,
    marginRight: 10,
  },
});
