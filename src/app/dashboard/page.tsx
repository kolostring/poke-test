"use client";

import { PokeCard } from "@/components/dashboard/PokeCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import fetchPokeCount from "@/lib/fetchPokeCount";
import fetchPokeTypesImages from "@/lib/fetchPokeTypesImages";
import { FetchState } from "@/models/types";
import { useEffect, useRef, useState } from "react";

export default function DashboardPage() {
  const [typesimgURL, setTypesimgURL] = useState<string[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>("pending");
  const [page, setPage] = useState(0);
  const pokeCount = useRef<number>(200);

  useEffect(() => {
    setFetchState("pending");
    Promise.all([fetchPokeCount(), fetchPokeTypesImages()])
      .then(([n, pokeTypesImages]) => {
        pokeCount.current = n;
        setTypesimgURL(pokeTypesImages);
        setFetchState("success");
      })
      .catch((reason) => {
        console.log(reason);
        setFetchState("error");
      });
  }, []);

  const handlePaginationChange = (delta: number) => {
    setPage(
      Math.min(Math.max(0, page + delta), Math.floor(pokeCount.current / 20)),
    );
  };

  if (fetchState === "pending") {
    return <>Loading Page</>;
  }
  if (fetchState === "error") {
    return <>Error Loading the page</>;
  }
  if (fetchState === "success") {
    return (
      <main>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePaginationChange(-3)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => handlePaginationChange(-1)}>
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive>{page + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => handlePaginationChange(1)}>
                {page + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => handlePaginationChange(3)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <div className="grid grid-cols-5">
          {[...Array(20)].map((_, index) => (
            <PokeCard
              id={index + page * 20 + 1}
              key={index + page * 20 + 1}
              typesimgURL={typesimgURL}
            />
          ))}
        </div>
      </main>
    );
  }
}
