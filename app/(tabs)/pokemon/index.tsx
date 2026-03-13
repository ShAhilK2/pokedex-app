import { getPokemonId, getPokemonSpriteUrl, useFetchPokemonList } from '@/hooks/use-fetch';
import { Pokemon } from '@/types/data';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';


const DetailsScreen = () => {

const PAGE_SIZE = 30;
const [offset,setOffset] = useState(0)

const{pokemonData,loading,error} = useFetchPokemonList(PAGE_SIZE, offset);

const loadMore = () =>{
  if(!loading){
    setOffset((prev)=>prev + PAGE_SIZE)
  }
}


if(loading && pokemonData.length === 0){
    return <View className='flex-1 justify-center items-center'>
    <ActivityIndicator size={"large"} color={"red"}/>
    </View> 
}

if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  const renderItem = ({item}:{item:Pokemon}) =>{
    const id = getPokemonId(item.url)
    const imageUrl = getPokemonSpriteUrl(id)
    
    return (
        <TouchableOpacity onPress={()=>router.push(`/(tabs)/pokemon/${id}`)}
        className='flex flex-row items-center px-4'>
        <Image source={{uri : imageUrl}} className="w-[80px] h-[80px] object-cover"/>

        <Text className='text-lg text-semibold'>
            #{id} {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
       </TouchableOpacity>

    )
  }


   return (
   <FlatList
    data={pokemonData}
    renderItem={renderItem}
    keyExtractor={(item)=>item.name}
    onEndReached={loadMore}
    onEndReachedThreshold={0.5}
    ListFooterComponent={
      loading && pokemonData.length > 0
        ? <ActivityIndicator />
        : null
    } 
    contentContainerStyle={{}}
   />
   )
}

export default DetailsScreen