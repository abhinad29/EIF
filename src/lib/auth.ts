// SANDBOX STAND-IN, do not copy to real repo
import { cache } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export type Role = "advisor" | "eir" | "admin";
export type Profile = { id: string; full_name: string; email: string; role: Role };

const ROLES: Role[] = ["advisor", "eir", "admin"];

function demoRole(): Role {
  return ROLES.find((role) => role === process.env.DEMO_ROLE) ?? "advisor";
}

export const getProfile = cache(async (): Promise<Profile | null> => {
  // The real getProfile reads auth cookies, which makes guarded routes render per request.
  // connection() reproduces that here so DEMO_ROLE is read at request time, not baked in at build.
  await connection();
  return {
    id: "demo",
    full_name: "Jamie Chen",
    email: "jamie.chen@northeastern.edu",
    role: demoRole(),
  };
});

export function homeFor(role: Role) {
  return role === "eir" ? "/eir" : "/advisor";
}

export async function requireRole(...roles: Role[]) {
  const profile = await getProfile();
  if (!profile) redirect("/login");
  if (!roles.includes(profile.role)) redirect(homeFor(profile.role));
  return profile;
}

export function displayName(profile: Profile) {
  return profile.full_name || profile.email.split("@")[0];
}
