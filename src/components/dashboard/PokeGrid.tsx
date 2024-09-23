"use client";
import fetchPokeURLs, { PokeURLsData } from "@/lib/fetchPokeURLs";
import { FetchState } from "@/models/types";
import { useEffect, useState } from "react";
import { PokeCard } from "./PokeCard";
import { PokeTypeData } from "@/lib/fetchPokeTypes";

type PokeGridProps = {
  pokeTypesData: PokeTypeData[];
  page: number;
};

export default function PokeGrid({ pokeTypesData: pokeTypesData, page }: Readonly<PokeGridProps>) {
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

  if (fetchState === "pending") {
    return <>Loading Grid</>;
  }
  if (fetchState === "error") {
    return <>Error Loading the Grid</>;
  }
  if (fetchState === "success") {
    return (
      <div className="grid grid-cols-5">
        {pokeURLs?.results.map((poke, index) => (
          <PokeCard
            className="max-w-[232px]"
            url={poke.url}
            key={index + page * 20 + 1}
            pokeTypesData={pokeTypesData}
          />
        ))}
      </div>
    );
  }
}
