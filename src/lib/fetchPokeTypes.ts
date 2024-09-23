type PokeTypeResponse = {
  name: string;
  sprites: {
    "generation-viii": {
      "legends-arceus": { name_icon: string };
    };
  };
};

export type PokeTypeData = {
  name: string;
  imageURL: string;
}

export default async function fetchPokeTypes() {
  const typesInfo = await fetch(`https://pokeapi.co/api/v2/type/`);
  const count = ((await typesInfo.json()) as { count: number }).count;
  console.log("count: ", count);

  const promises = [];
  for (let i = 1; i < count - 1; i++) {
    promises.push(fetch(`https://pokeapi.co/api/v2/type/${i}/`));
  }

  const resolved = await Promise.all(promises);

  const jsoned = await Promise.all(resolved.map((value) => value.json()));

  const typesIMGS: PokeTypeData[] = jsoned.map(
    (value) => {
      const response = value as PokeTypeResponse;

      return {
        name: response["name"],
        imageURL:
          response["sprites"]["generation-viii"]["legends-arceus"].name_icon,
      };
    },
  );

  return typesIMGS;
}
