export default function ProductDetailsLoading() {
  return (
    <div className="max-w-3xl space-y-6 animate-pulse">
      <div className="h-4 w-32 rounded bg-muted" />

      <div className="h-50 w-50 rounded bg-muted" />
      <div className="h-6 w-3/4 rounded bg-muted" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-4/6 rounded bg-muted" />
      </div>
      <div className="h-5 w-24 rounded bg-muted" />
    </div>
  );
}
