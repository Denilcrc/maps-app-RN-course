// con este hook podemos manejar cualquier permiso que necesitemos en la app
import { checkLocationPermission, requestLocationPermission } from '@/core/actions/permissions/location';
import { PermissionStatus } from '@/infrastructure/interfaces/location';
import { create } from 'zustand';


interface PermissionState {
    locationStatus: PermissionStatus;

    requestLocationPermission: () => Promise<PermissionStatus>;
    checkLocationPermission: () => Promise<PermissionStatus>;
}


export const usePermissionsStore = create<PermissionState> () ((set) => ({

    locationStatus: PermissionStatus.CHECKING,
    
    requestLocationPermission: async () => {
        const status = await requestLocationPermission();
        set({ locationStatus: status }); // actualizamos el estado
        
        return status;
    },
    
    checkLocationPermission: async () => {
        const status = await checkLocationPermission();
        set({ locationStatus: status }); // actualizamos el estado
        
        return status;
    },
}));


