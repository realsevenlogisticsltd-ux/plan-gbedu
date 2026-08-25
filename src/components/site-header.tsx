import Link from "next/link";
import { Gift } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const links = [
  { href: "#tapestry", label: "Tapestry" },
  { href: "#music", label: "Music" },
  { href: "#itinerary", label: "Itinerary" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mark.svg" alt="" className="size-8" />
          <span className="font-display text-lg tracking-tight">
            40 <span className="italic text-ruby">&amp;</span> Flourishing
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          href="/tribute"
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          <Gift />
          Leave a Tribute
        </Link>
      </div>
    </header>
  );
}
