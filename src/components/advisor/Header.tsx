// SANDBOX STAND-IN, do not copy to real repo
import Link from "next/link";

type HeaderProps = { name: string; title: string; homeHref?: string };

function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function Header({ name, title, homeHref = "/advisor" }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-line bg-white/70 px-4 py-3 sm:px-8">
      <Link
        href={homeHref}
        className="rounded text-2xl font-extrabold tracking-tight text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        IDEA
      </Link>
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white"
        >
          {initialsFor(name)}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-ink">{name}</p>
          <p className="text-xs text-muted">{title}</p>
        </div>
      </div>
    </header>
  );
}
