"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import fetchPokemon, { PokemonInfo } from "@/lib/fetchPokemon";
import { FetchState } from "@/models/types";
import Image from "next/image";
import { useEffect, useState } from "react";

type PokeCardProps = {
  id: number;
  typesimgURL: string[];
};

export function PokeCard({ id, typesimgURL, ...props }: Readonly<PokeCardProps>) {
  const [pokeInfo, setPokeInfo] = useState<PokemonInfo | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>("pending");

  useEffect(() => {
    setFetchState("pending");

    fetchPokemon(id + "")
      .then((res) => {
        setPokeInfo(res);
        setFetchState("success");
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, [id]);

  if (fetchState === "pending") {
    return <>Loading...</>;
  }

  if (fetchState === "error") {
    return <>Couldnt load</>;
  }

  if (fetchState === "success") {
    const name = pokeInfo?.name ?? "undefined";
    const pokeimgURL = pokeInfo?.sprites.front_default ?? "undefined";
    const height = pokeInfo?.height ?? "undefined";
    const weight = pokeInfo?.weight ?? "undefined";
    const types = pokeInfo?.types.map((item) => item.type.name) ?? ["undefined"];

    return (
      <Card {...props}>
        <CardHeader>
          <Image
            src={pokeimgURL}
            alt={name}
            width={64}
            height={64}
            className="h-full w-full"
          />
          <CardTitle className="capitalize">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-5">
          {types.map((type, index) => (
            <li key={type}>
              <Image src={typesimgURL[index]} alt={type} width={20} height={20} className="w-full h-full" />
            </li>
          ))}
        </ul>

          <p>{height} dm</p>
          <p>{weight} hg</p>
        </CardContent>
      </Card>
    );
  }
}
