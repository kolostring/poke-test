"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PokeTypeData } from "@/lib/fetchPokeTypes";
import fetchPokemon, { PokemonData } from "@/lib/fetchPokemon";
import { cn } from "@/lib/utils";
import { FetchState } from "@/models/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

type PokeCardProps = {
  url: string;
  pokeTypesData: PokeTypeData[];
} & React.HTMLAttributes<HTMLDivElement>;

export function PokeCard({
  url,
  pokeTypesData,
  ...props
}: Readonly<PokeCardProps>) {
  const [pokeInfo, setPokeInfo] = useState<PokemonData | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>("pending");

  useEffect(() => {
    const controller = new AbortController();
    setFetchState("pending");

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

  if (fetchState === "error") {
    return <div className="bg-red-600">Couldnt load</div>;
  }

  if (fetchState === "pending") {
    return (
      <Card
        {...props}
        className={cn([
          props.className,
          "display-background relative h-full max-h-[532px] w-full max-w-[256px] border-none",
        ])}
      >
        <CardHeader>
          <div className="relative isolate grid aspect-square w-full place-items-center overflow-hidden rounded-md bg-neutral-200 bg-opacity-50">
            <Skeleton className="h-full w-full" />
          </div>
          <Skeleton className="h-[1em] w-[7ch]" />

          <Skeleton className="h-[1em] w-[7ch]" />
        </CardHeader>
        <CardContent>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Skeleton className="h-[23px]" />
            <Skeleton className="h-[23px]" />
          </div>

          <div className="mt-4 flex justify-between font-light text-neutral-500">
            <Skeleton className="h-[1em] w-[4ch]" />
            <Skeleton className="h-[1em] w-[4ch]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (fetchState === "success") {
    return (
      <Card
        {...props}
        className={cn([
          props.className,
          'before before:bg-gradient after:bg-shiny-gradient group relative h-full max-h-[532px] w-full max-w-[256px] cursor-pointer overflow-hidden border-none transition-all before:absolute before:-left-1/3 before:-top-1/4 before:z-10 before:h-48 before:w-[200%] before:rotate-12 before:opacity-20 before:transition-opacity before:content-[""] after:absolute after:-bottom-full after:-left-1/3 after:h-20 after:w-[200%] after:rotate-12 after:bg-opacity-25 after:opacity-0 after:transition-all after:content-[""] hover:scale-105 hover:bg-green-50 hover:after:-translate-y-[800%] hover:after:translate-x-4 hover:after:opacity-50',
        ])}
      >
        <CardHeader>
          <div className="relative grid aspect-square w-full place-items-center rounded-md bg-neutral-200 bg-opacity-50">
            <Image
              className="absolute w-full scale-125 opacity-50 blur-lg brightness-150 saturate-[2] transition-transform group-hover:scale-[2]"
              src={pokeInfo?.pokeimgURL ?? "/"}
              alt={""}
              width={250}
              height={250}
            />
            <Image
              className="z-20 w-full transition-transform group-hover:rotate-6 group-hover:scale-125"
              src={pokeInfo?.pokeimgURL ?? "/"}
              alt={pokeInfo?.name ?? "null"}
              width={250}
              height={250}
            />
          </div>
          <CardDescription className="font-bold">
            No. {pokeInfo?.id?.toString().padStart(5, "0")}
          </CardDescription>
          <CardTitle className="uppercase">
            {pokeInfo?.name ?? "undefined"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            {pokeInfo?.types.map((type) => (
              <li key={type}>
                <Image
                  src={
                    pokeTypesData.find((value) => value.name === type)
                      ?.imageURL ?? "/"
                  }
                  alt={type ?? "undefined"}
                  width={200}
                  height={23}
                  className="h-full w-full"
                />
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between font-light text-neutral-500">
            <p>{pokeInfo?.height ?? "undefined"} dm</p>
            <p>{pokeInfo?.weight ?? "undefined"} hg</p>
          </div>
        </CardContent>
      </Card>
    );
  }
}
