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

export default async function fetchPokemon(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const pokemon = await res.json();

  return pokemon as PokemonInfo;
}
