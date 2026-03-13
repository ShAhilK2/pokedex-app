import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

const DetailsScreen = () => {
  return (
    <View className='flex justify-center items-center h-full'>
      <Text className='text-2xl font-bold'>Pokemon</Text>
      <Button title='View Pokemon Details' onPress={() => router.push('/pokemon/1')} />
    </View>
  )
}

export default DetailsScreen