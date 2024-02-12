import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="navbar sticky left-0 right-0 top-0 backdrop-blur-lg bg-opacity-30 bg-white">
      <div className="h-[56px] px-[8px] flex gap-[8px] items-center max-w-screen-xl mx-auto">
        <Link href="/">
          <div className="brand shrink-0 font-bold text-2xl">Synblog</div>
        </Link>
        <Button asChild variant="link" className="ml-[16px]">
          <Link href="/">Articles</Link>
        </Button>
        <Button asChild variant="link">
          <Link href="/user">Users</Link>
        </Button>
      </div>
    </div>
  );
}
