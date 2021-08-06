import React, { useState, useEffect } from 'react';
import {
    View,
    Button,
    Text,
    ActivityIndicator,
    Alert,
    StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import Colors from '../constants/Colors';

const LocationPicker = props => {
 const [isFetching, setIsFetching] = useState(false);
 const [location, setLocation] = useState(false);
 const [ pickedLocation, setPickedLocation ] = useState();

 useEffect(()=>{
(async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted'){
        Alert.alert(
            'Permisos insuficientes',
            'Necesita dar permisos de localización',
            [{text: 'Okay'}]
        );
        return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
})();
 }, []);

 

 const getLocationHandler = async() => {
if (!location){
    return;
}
try{
    setIsFetching(true);
    const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
        
    });
    console.log(location);
 
    setPickedLocation({
       
        lat: location.coords.latitude,
        lng: location.coords.longitude,
    });
} catch (err){
    Alert.alert(
        'No se pudo obtener la localización',
        'Por favor intente nuevamente,',
        [{text: 'okay'}]

    )
}
setIsFetching(false); 
 };

 const handlerPickonMap = () => props.navigation.push('Map');

 return (
     <View style={styles.locationPicker}>
         <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={handlerPickonMap}>
             {isFetching ? (
                 <ActivityIndicator size="large" color={Colors.primary}/>
             ) : (
                 <Text>Location en proceso</Text>
             )}
         </MapPreview>
<Button title="Obtener Location"
color={Colors.primary}
onPress={getLocationHandler} />
<Button title="Pick Map"
color={Colors.primary}
onPress={handlerPickonMap} />

     </View>
 )

}
const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
});
export default LocationPicker