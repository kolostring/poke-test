export type PokemonInfo = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: { slot: number; type: { name: string } }[];
};


export default async function fetchPokemon(url: string, abortSignal: AbortSignal) {
  const res = await fetch(url, {signal: abortSignal});
  const pokemon = await res.json();

  return pokemon as PokemonInfo;
}
