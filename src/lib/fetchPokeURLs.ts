export type PokeURLsData = {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
};

export default async function fetchPokeURLs(page: number, limit: number) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${page*limit}&limit=${limit}`,
  );
  const pokemons = await res.json();

  return pokemons as PokeURLsData;
}
