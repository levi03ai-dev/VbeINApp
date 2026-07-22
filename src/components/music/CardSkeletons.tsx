import { Skeleton } from "@/components/ui/skeleton";

export function AlbumCardSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`flex flex-col text-left ${wide ? "w-[78vw] max-w-[320px]" : "w-full"}`}>
      <Skeleton className="aspect-square w-full rounded-xl bg-muted/40" />
      <Skeleton className="mt-2 h-4 w-4/5 rounded bg-muted/40" />
      <Skeleton className="mt-1 h-3 w-1/2 rounded bg-muted/40" />
    </div>
  );
}

export function PlaylistTileSkeleton() {
  return (
    <div className="w-full text-left">
      <Skeleton className="aspect-square w-full rounded-xl bg-muted/40" />
    </div>
  );
}

export function TrackRowSkeleton() {
  return (
    <div className="flex w-full items-center gap-3 rounded-xl py-1 px-2">
      <Skeleton className="h-9 w-9 shrink-0 rounded-lg bg-muted/40" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-3/4 rounded bg-muted/40" />
        <Skeleton className="h-3 w-1/2 rounded bg-muted/40" />
      </div>
      <Skeleton className="h-3 w-8 rounded shrink-0 mr-1 bg-muted/40" />
    </div>
  );
}

export function HeroCardSkeleton() {
  return (
    <div className="relative aspect-[16/10] w-[86vw] max-w-[450px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/5 bg-muted/30">
      <div className="absolute inset-0 flex flex-col justify-end p-5 space-y-2">
        <Skeleton className="h-3 w-16 rounded bg-muted-foreground/20" />
        <Skeleton className="h-6 w-3/4 rounded bg-muted-foreground/20" />
        <Skeleton className="h-3.5 w-1/2 rounded bg-muted-foreground/20" />
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-7 w-20 rounded-full bg-muted-foreground/20" />
          <Skeleton className="h-7 w-16 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    </div>
  );
}

export function GenreCardSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <Skeleton
      className={`rounded-xl border border-white/10 bg-muted/40 ${
        wide ? "col-span-2 aspect-[21/9]" : "col-span-1 aspect-square"
      }`}
    />
  );
}
