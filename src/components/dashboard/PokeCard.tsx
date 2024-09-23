"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PokeTypeData } from "@/lib/fetchPokeTypes";
import fetchPokemon, { PokemonInfo } from "@/lib/fetchPokemon";
import { FetchState } from "@/models/types";
import Image from "next/image";
import { useEffect, useState } from "react";

type PokeCardProps = {
  url: string;
  pokeTypesData: PokeTypeData[];
} & React.HTMLAttributes<HTMLDivElement>;

export function PokeCard({
  url,
  pokeTypesData,
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
          <Image className="mx-auto bg-" src={pokeimgURL} alt={name} width={120} height={120} />
          <CardDescription className="font-bold">No. {id}</CardDescription>
          <CardTitle className="capitalize ">{name}</CardTitle>
          <ul className="grid grid-cols-2">
            {types.map((type) => (
              <li key={type}>
                <Image
                  src={pokeTypesData.find((value)=>value.name===type)?.imageURL ?? ""}
                  alt={type}
                  width={200}
                  height={200}
                  className="h-full w-full"
                />
              </li>
            ))}
          </ul>
        </CardHeader>
        <CardContent>

          <p>{height} dm</p>
          <p>{weight} hg</p>
        </CardContent>
      </Card>
    );
  }
}
