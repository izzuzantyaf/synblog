import { Button } from "@/components/atoms/Button";
import GithubButton from "@/components/atoms/GithubButton";
import Link from "next/link";
import { Button as ButtonAntd, Flex } from "antd";
import { cn } from "@/lib/utils";

const styles = {
  buttonLink: "!text-primary p-0 hover:underline",
} as const;

export function Navbar() {
  return (
    <div className="navbar sticky left-0 right-0 top-0 backdrop-blur-lg bg-opacity-30 bg-white z-10">
      <div className="h-[56px] px-[16px] flex gap-[16px] items-center max-w-screen-xl mx-auto">
        <Link href="/" className="hidden sm:inline">
          <div className="brand shrink-0 font-bold text-2xl">Synblog</div>
        </Link>

        <ButtonAntd
          type="link"
          className={cn(styles.buttonLink, "sm:ml-[8px]")}
          rootClassName="!p-[0px]"
        >
          <Link href="/">Articles</Link>
        </ButtonAntd>

        <ButtonAntd
          type="link"
          className={styles.buttonLink}
          rootClassName="!p-[0px]"
        >
          <Link href="/user">Users</Link>
        </ButtonAntd>

        <ButtonAntd
          type="link"
          className={styles.buttonLink}
          rootClassName="!p-[0px]"
        >
          <Link href="/student">Students</Link>
        </ButtonAntd>

        {/* <Button asChild variant="link" className="ml-[16px] p-0">
          <Link href="/">Articles</Link>
        </Button>
        <Button asChild variant="link" className="ml-[16px] p-0">
          <Link href="/user">Users</Link>
        </Button> */}

        <div className="flex-grow"></div>

        <GithubButton />
      </div>
    </div>
  );
}
