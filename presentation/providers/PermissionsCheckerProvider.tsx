import { PermissionStatus } from '@/infrastructure/interfaces/location';
import { router } from 'expo-router';
import { PropsWithChildren, useEffect } from 'react';
import { AppState } from 'react-native';
import { usePermissionsStore } from '../store/usePermissions';

const PermissionsCheckerProvider = ({children}:PropsWithChildren) => {
 
    const { locationStatus, checkLocationPermission } = usePermissionsStore();
 
    // navegacion segun el estado del permiso, se ejecuta cada vez que locationStatus cambia
    useEffect(() => {
        if (locationStatus === PermissionStatus.GRANTED) {
            router.replace('/map');
        } else if (locationStatus !== PermissionStatus.CHECKING) {
            router.replace('/permissions');
        }
    }, [locationStatus]);

    // chequeo inicial de permisos
    useEffect(() => { 
        checkLocationPermission();
    }, []);

    // chequeo de permisos cada vez que la app pasa a primer plano
    useEffect(() => {
      const suscription = AppState.addEventListener('change', (nextAppState) => {
        // console.log({nextAppState}) // 'active', 'background', 'inactive'
        if (nextAppState === 'active') {
          checkLocationPermission();
        }
      })
    
    //como suscription: NativeEventSubscription debemos limpiar el evento  
      return () => {
        suscription.remove()
      }
    }, [])
    

    return (
    <>
    {/* todo: no se si al tenerlo en un hijo me de error */}
      {children} 
    </>
  )
}

export default PermissionsCheckerProvider