import { PermissionStatus } from '@/infrastructure/interfaces/location';
import * as location from 'expo-location'; // importamos expo location, que nos permite manejar los permisos de localizacion
import { Alert, Linking } from 'react-native';


export const requestLocationPermission = async ():Promise<PermissionStatus> => {

    const { status } = await location.requestForegroundPermissionsAsync(); // Determines the status of the permission.

    if (status !== 'granted') {
        if (status === 'denied') {
            await manualPermissionRequest(); // si el usuario denega los permisos lo que podemos hacer es, desde nuestra app mandarlo a las cofiguraciones del dispositivo
        }
        return PermissionStatus.DENIED;
    }

    return PermissionStatus.GRANTED;
}

export const checkLocationPermission = async () => {

    const { status } = await location.getForegroundPermissionsAsync(); // Checks the current status of the permission.

    switch (status) {
        case 'granted':
            return PermissionStatus.GRANTED;
        case 'denied':
            return PermissionStatus.DENIED;
        default:
            return PermissionStatus.UNDETERMINED;
    }
}

const manualPermissionRequest = async () => { //se llama si status !== 'granted'

    Alert.alert(
        'Permiso de localización necesario',
        'Por favor, habilita el permiso de localización en la configuración de la aplicación.',
        [
            { text: 'Abrir configuración', onPress: () => {Linking.openSettings()} }, //btn 1
            { text: 'Cancelar', style: 'destructive' } //btn 2
        ]
    )

}

