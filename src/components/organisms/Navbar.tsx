import { Button } from "@/components/atoms/Button";
import GithubButton from "@/components/atoms/GithubButton";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="navbar sticky left-0 right-0 top-0 backdrop-blur-lg bg-opacity-30 bg-white z-10">
      <div className="h-[56px] px-[16px] flex gap-[8px] items-center max-w-screen-xl mx-auto">
        <Link href="/">
          <div className="brand shrink-0 font-bold text-2xl">Synblog</div>
        </Link>
        <Button asChild variant="link" className="ml-[16px] p-0">
          <Link href="/">Articles</Link>
        </Button>
        <Button asChild variant="link" className="ml-[16px] p-0">
          <Link href="/user">Users</Link>
        </Button>
        <div className="flex-grow"></div>
        <GithubButton />
      </div>
    </div>
  );
}
