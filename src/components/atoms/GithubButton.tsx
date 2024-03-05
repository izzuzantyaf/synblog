import { Button } from "@/components/atoms/Button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Button as ButtonAntd } from "antd";

export default function GithubButton() {
  return (
    <ButtonAntd
      icon={<GithubIcon />}
      href={"https://github.com/izzuzantyaf/synblog"}
    />
  );

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
