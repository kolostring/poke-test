import { Skeleton } from "../ui/skeleton";

export default function PokeGridSkeleton() {
  return (
    <div className="mx-auto grid w-full grid-cols-2 place-items-center justify-center gap-4 md:grid-cols-3 lg:grid-cols-5">
      <Skeleton className="h-[360px] w-[256px] bg-white" />
      <Skeleton className="h-[360px] w-[256px] bg-white" />
      <Skeleton className="h-[360px] w-[256px] bg-white" />
      <Skeleton className="h-[360px] w-[256px] bg-white" />
      <Skeleton className="h-[360px] w-[256px] bg-white" />
      <Skeleton className="h-[360px] w-[256px] bg-white" />
      <Skeleton className="h-[360px] w-[256px] bg-white" />
      <Skeleton className="h-[360px] w-[256px] bg-white" />
      <Skeleton className="h-[360px] w-[256px] bg-white" />
      <Skeleton className="h-[360px] w-[256px] bg-white" />
    </div>
  );
}
