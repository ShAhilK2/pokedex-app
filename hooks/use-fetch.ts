import { Pokemon, PokemonDetails } from "@/types/data";
import { useEffect, useState } from "react";

const SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";


const BASE_URL = "https://pokeapi.co/api/v2/"
export const useFetchPokemonList = (limit: number, offset: number = 0) => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${BASE_URL}pokemon?limit=${limit}&offset=${offset}`
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

/** Fetches a large list for search and filters by id or name. Only runs when query is non-empty. */
export const useFetchPokemonSearch = (query: string) => {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setSearchResults([]);
      return;
    }
    let cancelled = false;
    const fetchAll = async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(`${BASE_URL}pokemon?limit=2000&offset=0`);
        const data = await res.json();
        if (cancelled) return;
        const results: Pokemon[] = data.results ?? [];
        const lower = q.toLowerCase();
        const byId = !Number.isNaN(Number(q)) ? Number(q) : null;
        const filtered = results.filter((item: Pokemon) => {
          const id = getPokemonId(item.url);
          if (byId !== null && Number(id) === byId) return true;
          return item.name.toLowerCase().includes(lower);
        });
        setSearchResults(filtered);
      } catch (e) {
        if (!cancelled) setSearchResults([]);
      } finally {
        if (!cancelled) setSearchLoading(false);
      }
    };
    fetchAll();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { searchResults, searchLoading };
};

export const getPokemonId = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
};

export const getPokemonSpriteUrl = (id: string) => {
  return `${SPRITE_URL}/${id}.png`;
};

export async function fetchPokemonDetails(id: string): Promise<PokemonDetails> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon details: ${res.status}`);
  }
  // INSERT_YOUR_CODE
  // Add a short artificial delay before returning the details (e.g. simulate network)
  if (__DEV__) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return res.json();
}
