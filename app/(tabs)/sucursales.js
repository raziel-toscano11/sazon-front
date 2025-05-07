import { View, StyleSheet, Alert } from 'react-native';
import { Screen } from '../../components/Screen';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import PinOrigin from '../../assets/pin-mapa.png';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

export default function Sucursales() {

    const sucursales = [
        {
            id: 1,
            nombre: "Sucursal Calzada Madero",
            coordenadas: {
                latitude: 17.078130,
                longitude: -96.742232,
            }
        },
        {
            id: 2,
            nombre: "Sucursal Camino Nacional",
            coordenadas: {
                latitude: 17.0630150,
                longitude: -96.7076900,
            }
        },
        {
            id: 3,
            nombre: "Sucursal Volcanes",
            coordenadas: {
                latitude: 17.0915745,
                longitude: -96.708930,
            }
        },
        {
            id: 4,
            nombre: "Sucursal Xoxocotlán",
            coordenadas: {
                latitude: 17.026519,
                longitude: -96.729531,
            }
        },
        {
            id: 5,
            nombre: "Sucursal Santa Rosa",
            coordenadas: {
                latitude: 17.099038,
                longitude: -96.750393,
            }
        },
        {
            id: 6,
            nombre: "Sucursal El Rosario",
            coordenadas: {
                latitude: 17.0484992,
                longitude: -96.6963329,
            }
        },
        {
            id: 7,
            nombre: "Sucursal Zócalo",
            coordenadas: {
                latitude: 17.060869,
                longitude: -96.724480,
            }
        },
        {
            id: 8,
            nombre: "Sucursal Reforma",
            coordenadas: {
                latitude: 17.080356,
                longitude: -96.710517,
            }
        },
    ];

    const [origin, setOrigin] = useState({
        latitude: 17.060749,
        longitude: -96.725701
    });

    useEffect(() => {
        getLocationPermission();
    }, []);

    async function getLocationPermission() {
        let { status } = await requestForegroundPermissionsAsync();
        if(status !== 'granted') {
            Alert('Permiso denegado');
            return;
        }
        let location = await getCurrentPositionAsync({});
        const current = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        setOrigin(current);
    }

    return (
        <Screen>
            <View style={styles.container}>
                <MapView 
                    style={styles.map} 
                    initialRegion={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.04
                    }}
                >
                    {sucursales.map((sucursal) => (
                        <Marker
                            key={sucursal.id}
                            coordinate={sucursal.coordenadas}
                            title={sucursal.nombre}
                        />
                    ))}
                    <Marker 
                        coordinate={origin}
                        image={PinOrigin}
                        title='Yo'
                    />
                </MapView>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%'
    }
});

