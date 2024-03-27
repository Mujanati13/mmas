import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function Welcome({navigation}) {
  const [screen, setscreen] = useState(0);

  const handleScreenSwitcher = () => {
    setscreen((screen + 1) % 3);
  };
  const handleScreenSwitcherPrev = () => {
    setscreen(screen > 0 ? (screen - 1) % 3 : 0);
  };

  return (
    <SafeAreaView>
      <View style={{width: 'auto'}}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 300,
              height: 300,
              borderWidth: 1,
              borderColor: 'black', // Changed from borderBlockColor
              borderRadius: 150,
              marginTop: 50,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              paddingTop: 50,
            }}>
            {screen == 0 ? (
              <Image
                source={require('../../assets/welcome/chat2.png')}
                style={{width: 200, height: 200}}
              />
            ) : screen == 1 ? (
              <Image
                source={require('../../assets/welcome/person1.png')}
                style={{width: 200, height: 200}}
              />
            ) : screen == 2 ? (
              <Image
                source={require('../../assets/welcome/folder.png')}
                style={{width: 200, height: 200}}
              />
            ) : (
              ''
            )}
          </View>
        </View>
        {screen == 0 ? (
          <View
            style={{
              backgroundColor: '#324EFF',
              width: 'auto',
              height: '100%',
              marginTop: 50,
              padding: 30,
            }}>
            <Text
              style={{
                marginTop: 30,
                fontSize: 25,
                color: 'white',
                fontWeight: 500,
                letterSpacing: 0.5,
              }}>
              Welcome
            </Text>
            <Text
              style={{
                letterSpacing: 0.6,
                marginTop: 10,
                fontSize: 20,
                color: 'white',
                fontWeight: 400,
                height: 90,
              }}>
              We are provide a medical chat assistant
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View
                style={{
                  width: 40,
                  height: 7,
                  backgroundColor: 'white',
                  borderRadius: 5,
                }}></View>
              <View
                style={{
                  width: 20,
                  height: 7,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginLeft: 5,
                  opacity: 0.5,
                }}></View>
              <View
                style={{
                  width: 20,
                  height: 7,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginLeft: 5,
                  opacity: 0.5,
                }}></View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 60,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: 160,
                  height: 50,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: 10,
                }}>
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={{
                    fontSize: 20,
                    textAlign: 'center', // Center text horizontally
                    textAlignVertical: 'center', // Center text vertically
                    fontWeight: 600,
                    paddingTop: 10,
                  }}>
                  Skip
                </Text>
              </View>
              <View
                style={{
                  width: 160,
                  height: 50,
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}>
                <Text
                  onPress={handleScreenSwitcher}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    textAlign: 'center', // Center text horizontally
                    textAlignVertical: 'center', // Center text vertically
                    fontWeight: 600,
                    paddingTop: 10,
                  }}>
                  Next
                </Text>
              </View>
            </View>
          </View>
        ) : screen == 1 ? (
          <View
            style={{
              backgroundColor: '#324EFF',
              width: 'auto',
              height: '100%',
              marginTop: 50,
              padding: 30,
            }}>
            <Text
              style={{
                marginTop: 30,
                fontSize: 25,
                color: 'white',
                fontWeight: 500,
                letterSpacing: 0.6,
              }}>
              Personalization
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
                color: 'white',
                fontWeight: 400,
                height: 90,
                letterSpacing: 0.7,
              }}>
              We provide a custom conversion for each patient
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View
                style={{
                  width: 20,
                  height: 7,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  opacity: 0.5,
                }}></View>
              <View
                style={{
                  width: 40,
                  height: 7,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginLeft: 5,
                }}></View>
              <View
                style={{
                  width: 20,
                  height: 7,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginLeft: 5,
                  opacity: 0.5,
                }}></View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 60,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: 160,
                  height: 50,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: 10,
                }}>
                <Text
                  onPress={handleScreenSwitcherPrev}
                  style={{
                    fontSize: 20,
                    textAlign: 'center', // Center text horizontally
                    textAlignVertical: 'center', // Center text vertically
                    fontWeight: 600,
                    paddingTop: 10,
                  }}>
                  Previous
                </Text>
              </View>
              <View
                style={{
                  width: 160,
                  height: 50,
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}>
                <Text
                  onPress={handleScreenSwitcher}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    textAlign: 'center', // Center text horizontally
                    textAlignVertical: 'center', // Center text vertically
                    fontWeight: 600,
                    paddingTop: 10,
                  }}>
                  Next
                </Text>
              </View>
            </View>
          </View>
        ) : screen == 2 ? (
          <View
            style={{
              backgroundColor: '#324EFF',
              width: 'auto',
              height: '100%',
              marginTop: 50,
              padding: 30,
            }}>
            <Text
              style={{
                marginTop: 30,
                fontSize: 25,
                color: 'white',
                fontWeight: 500,
                letterSpacing: 0.6,
              }}>
              Upload the medical folder
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 20,
                color: 'white',
                fontWeight: 400,
                height: 90,
                letterSpacing: 0.7,
              }}>
              Allow uploading medical folders for better patient understanding.
            </Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <View
                style={{
                  width: 20,
                  height: 7,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  opacity: 0.5,
                }}></View>
              <View
                style={{
                  width: 20,
                  height: 7,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginLeft: 5,
                  opacity: 0.5,
                }}></View>
              <View
                style={{
                  width: 40,
                  height: 7,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  marginLeft: 5,
                }}></View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 60,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: 160,
                  height: 50,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: 10,
                }}>
                <Text
                  onPress={handleScreenSwitcherPrev}
                  style={{
                    fontSize: 20,
                    textAlign: 'center', // Center text horizontally
                    textAlignVertical: 'center', // Center text vertically
                    fontWeight: 600,
                    paddingTop: 10,
                  }}>
                  Previous
                </Text>
              </View>
              <View
                style={{
                  width: 160,
                  height: 50,
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}>
                <Text
                  onPress={() => navigation.navigate('Register')}
                  style={{
                    color: 'black',
                    fontSize: 20,
                    textAlign: 'center', // Center text horizontally
                    textAlignVertical: 'center', // Center text vertically
                    fontWeight: 600,
                    paddingTop: 10,
                  }}>
                  Done
                </Text>
              </View>
            </View>
          </View>
        ) : (
          ''
        )}
      </View>
    </SafeAreaView>
  );
}

Welcome.navigationOptions = {
  headerShown: false, // Hides the header bar
};

export default Welcome;
