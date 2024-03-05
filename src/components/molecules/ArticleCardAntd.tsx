import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Card as CardAntd } from "antd";

const { Meta } = CardAntd;

export default function ArticleCardAntd({
  url,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  title,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  url: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
}) {
  return (
    <article className="w-full" {...props}>
      <Link href={url}>
        <CardAntd
          hoverable
          cover={
            <Image
              src={imageSrc}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Vg8AAjEBV1arMJ8AAAAASUVORK5CYII="
              className="rounded-lg"
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
            />
          }
        >
          <Meta title={title} />
        </CardAntd>
      </Link>
    </article>
  );
}
