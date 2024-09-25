import PokeCardSkeleton from "./PokeCardSkeleton";

export default function PokeGridSkeleton() {
  return (
    <div className="mx-auto flex w-full flex-wrap place-items-center justify-center gap-4">
      <PokeCardSkeleton />
      <PokeCardSkeleton />
      <PokeCardSkeleton />
      <PokeCardSkeleton />
      <PokeCardSkeleton />
      <PokeCardSkeleton />
      <PokeCardSkeleton />
      <PokeCardSkeleton />
      <PokeCardSkeleton />
      <PokeCardSkeleton />

    </div>
  );
}
