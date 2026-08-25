import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { LogOut } from "lucide-react";
import { adminLogout } from "@/app/admin/actions";
import { ADMIN_COOKIE } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { LoginForm } from "@/components/admin-login";
import { AdminDashboard } from "@/components/admin-dashboard";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Curator Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authed = cookieStore.get(ADMIN_COOKIE)?.value === "granted";

  if (!authed) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-velvet px-6 py-12 text-ivory">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="font-display text-3xl">Curator Dashboard</h1>
          <p className="max-w-sm text-sm text-ivory/60">
            The hall&apos;s tribute curator — approve blessings and light up the
            projector wall.
          </p>
        </div>
        <LoginForm />
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-ivory/40 transition-colors hover:text-gold"
        >
          ← Back to the celebration
        </Link>
      </main>
    );
  }

  const tributes = await prisma.tribute.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      authorName: true,
      relationship: true,
      polishedMessage: true,
      rawMessage: true,
      poeticSummary: true,
      category: true,
      isApproved: true,
      isFeatured: true,
      tableNumber: true,
      createdAt: true,
    },
  });

  return (
    <main className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-display text-lg">
              40 <span className="italic text-ruby">&amp;</span> Flourishing
            </Link>
            <span className="rounded-full border border-gold/50 bg-gold/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Curator
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/projector" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Open Projector
            </Link>
            <form action={adminLogout}>
              <Button type="submit" variant="ghost" size="sm">
                <LogOut /> Log out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="font-display text-4xl">Tribute Wall Curation</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Approve incoming blessings, highlight favourites to the projector,
            and curate the Ruby Keepsake Book.
          </p>
        </div>
        <AdminDashboard tributes={tributes} />
      </div>
    </main>
  );
}
