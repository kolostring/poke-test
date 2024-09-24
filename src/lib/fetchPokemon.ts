type PokemonResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: { slot: number; type: { name: string } }[];
};

export type PokemonData = {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokeimgURL: string;
  types: string[];
};

export default async function fetchPokemon(
  url: string,
  abortSignal: AbortSignal,
) {
  const res = await fetch(url, { signal: abortSignal });
  const pokemon = (await res.json()) as PokemonResponse;

  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    pokeimgURL: pokemon.sprites.front_default,
    types: pokemon.types.map((item) => item.type.name),
  } as PokemonData;
}
