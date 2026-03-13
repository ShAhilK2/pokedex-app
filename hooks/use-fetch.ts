import { Pokemon } from "@/types/data";
import { useEffect, useState } from "react";

const SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export const useFetchPokemonList = (limit: number, offset: number = 0) => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await res.json();
        setPokemonData((prev) =>
          offset === 0 ? data.results : [...prev, ...data.results]
        );
      } catch (error) {
        console.log(error);
        setError("Error fetching the Pokémon data");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [limit, offset]);

  return { loading, pokemonData, error };
};

export const getPokemonId = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
};

export const getPokemonSpriteUrl = (id: string) => {
  return `${SPRITE_URL}/${id}.png`;
};