import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

type LayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function Layout({ title, subtitle, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Food Autopilot</title>
      </Head>
      <div className="min-h-screen bg-oat-50">
        <header className="border-b border-oat-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-oat-600">
                Food Autopilot
              </p>
              <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
              {subtitle && <p className="text-slate-600">{subtitle}</p>}
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/onboarding" className="text-slate-600 hover:text-slate-900">
                Onboarding
              </Link>
              <Link href="/weekly-plan" className="text-slate-600 hover:text-slate-900">
                Weekly plan
              </Link>
              <Link href="/cart" className="rounded-full bg-oat-700 px-4 py-2 text-white">
                View cart
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
      </div>
    </>
  );
}
