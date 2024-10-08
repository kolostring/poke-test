"use client";

import PokeGrid from "@/components/dashboard/PokeGrid";
import fetchPokeTypes, { PokeTypeData } from "@/lib/fetchPokeTypes";
import { FetchState } from "@/models/types";
import { useEffect, useMemo, useState } from "react";

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
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import PokeGridSkeleton from "@/components/dashboard/PokeGridSkeleton";
import { Button } from "@/components/ui/button";
import { logout } from "../actions/auth";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [itemsCount, setItemsCount] = useState(0);
  const [pokeTypesData, setPokeTypesData] = useState<PokeTypeData[]>([]);

  const [fetchState, setFetchState] = useState<FetchState>("pending");

  useEffect(() => {
    setFetchState("pending");
    Promise.all([fetchPokeURLs(0, 20), fetchPokeTypes()])
      .then(([pokeurls, typesdata]) => {
        setItemsCount(pokeurls.count);
        setPokeTypesData(typesdata);
        setFetchState("success");
      })
      .catch((reason) => {
        console.log(reason);
        setFetchState("error");
      });
  }, []);

  const page = useMemo(
    () =>
      Math.min(
        Math.max(0, Number.parseInt(searchParams.get("page") ?? "0")),
        Math.floor(itemsCount / 20),
      ),
    [itemsCount, searchParams],
  );

  const getNewPagination = (delta: number) => {
    return Math.min(Math.max(0, page + delta), Math.floor(itemsCount / 20));
  };

  const handlePaginationChange = (delta: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", getNewPagination(delta) + "");
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (fetchState === "pending") {
    return (
      <main className="bg-zinc-700">
        <section className="bg-display h-dvh">
          <Skeleton className="mx-auto mb-8 h-[68px] w-[448px] rounded-b-full bg-white" />
          <PokeGridSkeleton />
        </section>
      </main>
    );
  }

  if (fetchState === "error") {
    return <>Error Loading the page</>;
  }
  if (fetchState === "success") {
    return (
      <>
        <aside className="fixed right-0 top-0">
          <Button
            variant={"secondary"}
            className="m-4"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </Button>
        </aside>
        <main className="bg-zinc-700">
          <section className="bg-display min-h-dvh w-full">
            <Pagination className="sticky top-0 z-50 mx-auto mb-8 w-fit rounded-b-full bg-white px-8 py-4">
              <PaginationContent className="grid grid-cols-[100px_2rem_2rem_2rem_2rem_2rem_100px]">
                {page - 1 >= 0 ? (
                  <PaginationItem className="cursor-pointer">
                    <PaginationPrevious
                      onClick={() => handlePaginationChange(-1)}
                    />
                  </PaginationItem>
                ) : (
                  <span></span>
                )}
                {page - 1 > 0 ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <span></span>
                )}
                {page - 1 >= 0 ? (
                  <PaginationItem className="cursor-pointer">
                    <PaginationLink onClick={() => handlePaginationChange(-1)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  <span></span>
                )}
                <PaginationItem className="cursor-pointer">
                  <PaginationLink isActive>{page + 1}</PaginationLink>
                </PaginationItem>
                {page + 1 <= itemsCount / 20 ? (
                  <PaginationItem className="cursor-pointer">
                    <PaginationLink onClick={() => handlePaginationChange(1)}>
                      {page + 2}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  <span></span>
                )}
                {page + 2 <= itemsCount / 20 ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <span></span>
                )}
                {page + 1 <= itemsCount / 20 ? (
                  <PaginationItem className="cursor-pointer">
                    <PaginationNext onClick={() => handlePaginationChange(1)} />
                  </PaginationItem>
                ) : (
                  <span></span>
                )}
              </PaginationContent>
            </Pagination>

            <PokeGrid page={page} pokeTypesData={pokeTypesData} />
          </section>
        </main>
      </>
    );
  }
}
