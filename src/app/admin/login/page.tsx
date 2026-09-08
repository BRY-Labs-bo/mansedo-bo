import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Ingreso",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ next?: string }>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await getSession();
  if (session) redirect("/admin");
  const { next } = await searchParams;
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-surface border border-line-l p-8">
        <h1 className="font-sans font-extrabold text-[26px] leading-[1.2] text-txt-l">
          Ingreso · Admin
        </h1>
        <p className="mt-2 text-body-sm text-mut-l">MANSEDO BUSINESS CONSULTING S.R.L.</p>
        <div className="mt-6">
          <LoginForm next={next ?? "/admin"} />
        </div>
      </div>
    </div>
  );
}
