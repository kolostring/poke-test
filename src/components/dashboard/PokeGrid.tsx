"use client";
import fetchPokeURLs, { PokeURLsData } from "@/lib/fetchPokeURLs";
import { FetchState } from "@/models/types";
import { useEffect, useState } from "react";
import { PokeCard } from "./PokeCard";
import { PokeTypeData } from "@/lib/fetchPokeTypes";
import PokeGridSkeleton from "./PokeGridSkeleton";

type PokeGridProps = {
  pokeTypesData: PokeTypeData[];
  page: number;
};

export default function PokeGrid({
  pokeTypesData,
  page,
}: Readonly<PokeGridProps>) {
  const [pokeURLs, setPokeURLs] = useState<PokeURLsData | null>(null);

  const [fetchState, setFetchState] = useState<FetchState>("pending");

  useEffect(() => {
    setFetchState("pending");
    fetchPokeURLs(page, 20)
      .then((pokedata) => {
        setPokeURLs(pokedata);
        setFetchState("success");
      })
      .catch((reason) => {
        console.log(reason);
        setFetchState("error");
      });
  }, [page]);

  if (fetchState === "error") {
    return <>Error loading pokemons</>;
  }

  if (fetchState === "pending") {
    return <PokeGridSkeleton />;
  }

  return (
    <div className="mx-auto flex flex-wrap w-full place-items-center justify-center gap-4">
      {pokeURLs?.results.map((poke, index) => (
        <PokeCard
          className="h-[360px] w-[210px]"
          url={poke.url}
          key={index + page * 20 + 1}
          pokeTypesData={pokeTypesData}
        />
      ))}
    </div>
  );
}
