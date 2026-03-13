import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const DetailsScreen = () => {
    const { id } = useLocalSearchParams<{id: string}>()
  return (
    <View className='flex justify-center items-center h-full'>
      <Text className='text-2xl font-bold'>DetailsScreen</Text>
      <Text className='text-lg'>{id}</Text>
    </View>
  )
}

export default DetailsScreen