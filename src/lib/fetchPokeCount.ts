export default async function fetchPokeCount() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const pokemon = await res.json();

  return pokemon["count"] as number;
}