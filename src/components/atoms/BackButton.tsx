import { Button } from "@/components/atoms/Button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function BackButton({ href }: { href?: string }) {
  const DEFAULT_HREF = "/";

  return (
    <Button size="icon" variant="ghost" asChild>
      <Link href={href ? href : DEFAULT_HREF}>
        <ArrowLeftIcon />
      </Link>
    </Button>
  );
}
