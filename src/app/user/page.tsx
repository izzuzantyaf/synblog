import { Navbar } from "@/components/Navbar";
import { TypographyH1 } from "@/components/typography/h1";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function UserPage() {
  return (
    <>
      <main>
        {/* Navbar */}
        <Navbar />
        {/* end of Navbar */}

        <div className="px-[16px] pb-0 max-w-screen-lg mx-auto">
          <Button size="icon" variant="ghost" asChild>
            <Link href="/">
              <ArrowLeftIcon />
            </Link>
          </Button>
        </div>

        <div className="p-[16px] pt-0 mt-[16px] max-w-screen-lg mx-auto">
          <TypographyH1>Users</TypographyH1>
          {/* User list / table */}

          {/* end of User list / table */}
        </div>
      </main>
    </>
  );
}
