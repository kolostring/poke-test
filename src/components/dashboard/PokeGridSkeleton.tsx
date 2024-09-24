import { Skeleton } from "../ui/skeleton";

export default function PokeGridSkeleton() {
  return (
    <div className="mx-auto flex flex-wrap w-full place-items-center justify-center gap-4">
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
