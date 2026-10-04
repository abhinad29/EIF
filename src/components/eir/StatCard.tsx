import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  detail?: string;
  icon: LucideIcon;
};

/** Rendered inside a <dl>. Values are pre-formatted strings (e.g. "17.6 / 20"). */
export default function StatCard({ label, value, detail, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-white/70 p-6 shadow-[0_1px_2px_rgba(15,27,45,0.04)]">
      <dt className="flex items-center justify-between gap-3 text-sm font-medium text-muted">
        {label}
        <Icon aria-hidden="true" className="h-5 w-5 text-navy" />
      </dt>
      <dd className="mt-3 text-3xl font-extrabold tracking-tight text-ink tabular-nums">{value}</dd>
      {detail ? <dd className="mt-1 text-sm text-muted">{detail}</dd> : null}
    </div>
  );
}
