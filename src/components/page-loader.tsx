"use client";

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 pointer-events-auto">
      <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin" />
    </div>
  );
}
