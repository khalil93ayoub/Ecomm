import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-12">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-4 h-4 w-full max-w-xl" />
    </div>
  );
}
