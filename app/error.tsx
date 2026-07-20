"use client";

import { Button } from "@/components/ui/Button";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-novara-danger">Error</p>
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-4 text-novara-muted">{error.message}</p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
