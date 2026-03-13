import { Stack } from 'expo-router'
import React from 'react'

const PokedexLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Pokemon' ,headerShown: true}} />
      <Stack.Screen name="[id]" options={{ title: 'Details' ,headerShown: true}} />
    </Stack>
  )
}

export default PokedexLayout