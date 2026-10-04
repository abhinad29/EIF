"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ClipboardCheck, House } from "lucide-react";

const navItems = [
  { href: "/eir", label: "Home", icon: House },
  { href: "/eir/evaluations", label: "Evaluations", icon: ClipboardCheck },
  { href: "/eir/ventures", label: "Venture Directory", icon: Building2 },
];

function isActive(pathname: string, href: string) {
  return href === "/eir" ? pathname === href : pathname.startsWith(href);
}

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="EIR navigation"
      className="flex gap-1 overflow-x-auto border-b border-line px-3 py-2 md:w-60 md:shrink-0 md:flex-col md:gap-2 md:border-b-0 md:border-r md:px-2 md:py-8"
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-[15px] transition-colors md:text-base ${
              active ? "bg-sun-100 font-semibold text-ink" : "text-muted hover:bg-sun-50 hover:text-ink"
            }`}
          >
            <Icon className={`h-5 w-5 ${active ? "text-navy-dark" : "text-navy"}`} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
