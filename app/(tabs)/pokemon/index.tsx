import { useDebounce } from '@/hooks/use-debounce';
import {
  getPokemonId,
  getPokemonSpriteUrl,
  useFetchPokemonList,
  useFetchPokemonSearch,
} from '@/hooks/use-fetch';
import { colors } from '@/theme/colors';
import { Pokemon } from '@/types/data';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const PAGE_SIZE = 30;
const DEBOUNCE_MS = 300;

const DetailsScreen = () => {
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery.trim(), DEBOUNCE_MS);

  const { pokemonData, loading, error } = useFetchPokemonList(PAGE_SIZE, offset);
  const { searchResults, searchLoading } = useFetchPokemonSearch(debouncedQuery);


  const isSearching = debouncedQuery.length > 0;
  const listData = isSearching ? searchResults : pokemonData;
  const listLoading = isSearching ? searchLoading : loading;

  const loadMore = () => {
    if (!loading && !isSearching) {
      setOffset((prev) => prev + PAGE_SIZE);
    }
  };

  if (loading && pokemonData.length === 0 && !isSearching) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Pokemon }) => {
    const id = getPokemonId(item.url);
    const imageUrl = getPokemonSpriteUrl(id);

    return (
      <TouchableOpacity
        onPress={() => router.push(`/(tabs)/pokemon/${id}`)}
        className="flex flex-row items-center px-4"
      >
        <Image
          source={{ uri: imageUrl }}
          className="w-[80px] h-[80px] object-cover"
        />
        <Text className="text-lg text-semibold">
          #{id} {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };

  const searchHeader = (
    <View className="flex-row items-center px-4 py-3 bg-[#f5f5f5] border-b border-[#eee]">
      <Ionicons name="search" size={20} color={colors.text.secondary} className="mr-2" />
      <TextInput
        className="flex-1 py-2 text-base text-[#333]"
        placeholder="Search by number or name"
        placeholderTextColor={colors.text.secondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      {!searchQuery.trim ||  searchQuery.length > 0  && <Ionicons name='close' size={20} onPress={()=>setSearchQuery("")} />}

    </View>
  );

  return (
    <FlatList
      data={listData}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${getPokemonId(item.url)}-${index}`}
      ListHeaderComponent={searchHeader}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps="handled"
      ListFooterComponent={
        listLoading && listData.length > 0 ? (
          <ActivityIndicator />
        ) : isSearching && searchLoading ? (
          <View className="py-4 items-center">
            <ActivityIndicator />
          </View>
        ) : null
      }
      ListEmptyComponent={
        isSearching ? (
          searchLoading ? (
            <View className="flex-1 py-8 items-center">
              <ActivityIndicator />
            </View>
          ) : (
            <View className="flex-1 py-8 items-center">
              <Text className="text-[#999]">
                No Pokémon match "{searchQuery}"
              </Text>
            </View>
          )
        ) : null
      }
      contentContainerStyle={listData.length === 0 ? { flex: 1 } : {}}
    />
  );
};

export default DetailsScreen