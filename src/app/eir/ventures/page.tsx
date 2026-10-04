import { requireRole } from "@/lib/auth";

export default async function EirVenturesPage() {
  await requireRole("eir");
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-[42px]">Venture Directory</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">The EIR venture directory will be available here.</p>
    </div>
  );
}
