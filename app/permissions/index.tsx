import { ThemedText } from '@/presentation/components/shared/themed-text'
import ThemedPressable from '@/presentation/components/shared/ThemedPressable'
import { usePermissionsStore } from '@/presentation/store/usePermissions'
import React from 'react'
import { View } from 'react-native'

const PermissionsScreen = () => {
 
  const { locationStatus, requestLocationPermission } =  usePermissionsStore()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      {/* si habilita la ubicación, navega a mapscreen */}
      <ThemedPressable onPress={requestLocationPermission}> 
        Habilitar ubicación {/* directamente el screen porque en ThemedPressable ya hay un <Text> */}
      </ThemedPressable>

      <ThemedText>Estado Actual: { locationStatus }</ThemedText>

    </View>
  )
}

export default PermissionsScreen