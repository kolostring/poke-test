"use client";

import PokeGrid from "@/components/dashboard/PokeGrid";
import fetchPokeTypesImages from "@/lib/fetchPokeTypesImages";
import { FetchState } from "@/models/types";
import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import fetchPokeURLs from "@/lib/fetchPokeURLs";

export default function DashboardPage() {
  const [page, setPage] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [typesimgURL, setTypesimgURL] = useState<string[]>([]);

  const [fetchState, setFetchState] = useState<FetchState>("pending");

  useEffect(() => {
    setFetchState("pending");
    Promise.all([fetchPokeURLs(0, 20), fetchPokeTypesImages()])
      .then(([pokeurls, pokeTypesImages]) => {
        setItemsCount(pokeurls.count);
        setTypesimgURL(pokeTypesImages);
        setFetchState("success");
      })
      .catch((reason) => {
        console.log(reason);
        setFetchState("error");
      });
  }, []);

  const handlePaginationChange = (delta: number) => {
    setPage(Math.min(Math.max(0, page + delta), Math.floor(itemsCount / 20)));
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
        <section className="h-full w-full">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePaginationChange(-3)}
                />
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

          <PokeGrid page={page} typesimgURL={typesimgURL} />
        </section>
      </main>
    );
  }
}
