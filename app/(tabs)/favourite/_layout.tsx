import { Stack } from 'expo-router'
import React from 'react'

const FavoutiteScreenLayout = () => {
  return (
   <Stack>
    <Stack.Screen name='index'options={{title : "Favourites"}}/>
   </Stack>
  )
}

export default FavoutiteScreenLayout