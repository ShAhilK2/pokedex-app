
import { PokemonDetails } from "@/components/pokemonDetails";
import { useLocalSearchParams } from "expo-router";

export default function PokemonDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return null;

  return <PokemonDetails id={id} showStatsButton={true} />;
}