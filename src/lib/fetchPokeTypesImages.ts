type PokeTypeResponse = {
  sprites: {
    "generation-viii": {
      "legends-arceus": { name_icon: string };
    };
  };
};

export default async function fetchPokeTypesImages() {
  const typesInfo = await fetch(`https://pokeapi.co/api/v2/type/`);
  const count = ((await typesInfo.json()) as { count: number }).count;
  console.log("count: ", count);

  const promises = [];
  for (let i = 1; i < count - 1; i++) {
    promises.push(fetch(`https://pokeapi.co/api/v2/type/${i}/`));
  }

  const resolved = await Promise.all(promises);

  const jsoned = await Promise.all(resolved.map((value) => value.json()));

  const typesIMGS: string[] = jsoned.map(
    (value) =>
      (value as PokeTypeResponse)["sprites"]["generation-viii"][
        "legends-arceus"
      ].name_icon,
  );

  return typesIMGS;
}
