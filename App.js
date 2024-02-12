import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, Platform } from 'react-native';
import Constants  from 'expo-constants';
import { useState } from 'react';

import Map from './screens/Map';
import { PaperProvider } from 'react-native-paper';
import MainAppBar from './components/MainAppBar';


const settings = {
  backgroundColor: '#00a484'
}

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_foung: 'crosshairs-gps'
}

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_known)
  const [location, setLocation] = useState({
    latitude: 65.0800,
    longitude: 25.4800,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const getUserPosition = async () => {
    setIcon(icons.location_searching)
    let{status} = await Location.requestForegroundPermissionsAsync()

    try {
        if (status !== 'granted') {
            console.log('Geolocation failed');
            return;
        }
        const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
        setLocation({...location, "latitude": position.coords.latitude,"longitude": position.coords.longitude})
    } catch (error) {
        console.log(error)
    }
};
  const { statusBarHeight } = Constants;

  return (
    <PaperProvider>
      <MainAppBar
        title="Map"
        backgroundColor={settings.backgroundColor}
        icon={icon}
        getUserPosition={getUserPosition}
      />
    <SafeAreaView style={styles.container}>
      <Map location={location} setLocation={setLocation} />
    </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
  },
});

