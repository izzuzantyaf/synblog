import { Button } from "@/components/atoms/Button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default function GithubButton() {
  return (
    <Button size="icon" variant="outline" asChild>
      <Link
        href={"https://github.com/izzuzantyaf/synblog"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
      </Link>
    </Button>
  );
}
