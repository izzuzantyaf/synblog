import { Button } from "@/components/atoms/Button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button as ButtonAntd } from "antd";

export default function BackButton({ href }: { href?: string }) {
  const DEFAULT_HREF = "/";

  return (
    <ButtonAntd
      icon={<ArrowLeftIcon />}
      href={href ? href : DEFAULT_HREF}
      type="text"
    ></ButtonAntd>
  );

  // return (
  //   <Button size="icon" variant="ghost" asChild>
  //     <Link href={href ? href : DEFAULT_HREF}>
  //       <ArrowLeftIcon />
  //     </Link>
  //   </Button>
  // );
}
