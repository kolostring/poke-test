import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PokeCardSkeleton(
  props: Readonly<React.HTMLAttributes<HTMLDivElement>>,
) {
  return (
    <Card
      {...props}
      className={cn([
        props.className,
        'display-background before:bg-gradient relative flex h-[380px] w-full max-w-[256px] flex-col overflow-hidden border-none before:absolute before:-left-1/3 before:-top-1/4 before:z-10 before:h-48 before:w-[200%] before:rotate-12 before:opacity-20 before:content-[""]',
      ])}
    >
      <CardHeader className="pb-0">
        <Skeleton className="mb-1 aspect-square w-full" />
        <Skeleton className="h-4 w-[7ch]" />

        <Skeleton className="mt-1 h-6 w-[12ch]" />
      </CardHeader>
      <CardContent className="flex h-full flex-col">
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Skeleton className="h-[26px]" />
          <Skeleton className="h-[26px]" />
        </div>

        <div className="mt-1 flex justify-between font-light text-neutral-500">
          <Skeleton className="h-[1em] w-[4ch]" />
          <Skeleton className="h-[1em] w-[4ch]" />
        </div>
      </CardContent>
    </Card>
  );
}
