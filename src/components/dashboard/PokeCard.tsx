"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import fetchPokemon, { PokemonInfo } from "@/lib/fetchPokemon";
import { FetchState } from "@/models/types";
import Image from "next/image";
import { useEffect, useState } from "react";

type PokeCardProps = {
  url: string;
  typesimgURL: string[];
};

export function PokeCard({
  url,
  typesimgURL,
  ...props
}: Readonly<PokeCardProps>) {
  const [pokeInfo, setPokeInfo] = useState<PokemonInfo | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>("pending");

  useEffect(() => {
    setFetchState("pending");
    const controller = new AbortController();

    fetchPokemon(url, controller.signal)
      .then((res) => {
        setPokeInfo(res);
        setFetchState("success");
      })
      .catch((reason) => {
        if (!controller.signal.aborted) {
          setFetchState("error");
          console.log(reason);
        }
      });

    return () => {
      setFetchState("pending");
      controller.abort();
    };
  }, [url]);

  if (fetchState === "pending") {
    return <div className="bg-yellow-300">Loading... Card</div>;
  }

  if (fetchState === "error") {
    return <div className="bg-red-600">Couldnt load</div>;
  }

  if (fetchState === "success") {
    const id = pokeInfo?.id ?? undefined;
    const name = pokeInfo?.name ?? "undefined";
    const pokeimgURL = pokeInfo?.sprites.front_default ?? "";
    const height = pokeInfo?.height ?? "undefined";
    const weight = pokeInfo?.weight ?? "undefined";
    const types = pokeInfo?.types.map((item) => item.type.name) ?? [
      "undefined",
    ];

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
          <CardDescription>{id}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-5">
            {types.map((type, index) => (
              <li key={type}>
                <Image
                  src={typesimgURL[index]}
                  alt={type}
                  width={20}
                  height={20}
                  className="h-full w-full"
                />
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
