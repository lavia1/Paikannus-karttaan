import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import * as Location from 'expo-location';
import { useEffect } from "react";

export default function Map(props, {location, setLocation}){

    const getUserPosition = async () => {
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

 /*   useEffect (() => {
        (async() => {
            getUserPosition()
        })()
    }, []);
*/

    return (
        <>
        <MapView
            style={styles.map}
            region={location}
        />
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
});