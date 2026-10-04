import Header from "@/components/advisor/Header";
import Sidebar from "@/components/eir/Sidebar";
import { displayName, requireRole } from "@/lib/auth";

export default async function EirLayout({ children }: LayoutProps<"/eir">) {
  const profile = await requireRole("eir");
  return (
    <div className="flex min-h-screen flex-col">
      <Header name={displayName(profile)} title="IDEA EIR" homeHref="/eir" />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 px-4 py-8 sm:px-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
