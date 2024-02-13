import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function ArticleCard({
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
        <Image
          src={imageSrc}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Vg8AAjEBV1arMJ8AAAAASUVORK5CYII="
          className="mb-5 rounded-lg"
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
        />
        <h2 className="mb-2 text-xl font-bold leading-tight">{title}</h2>
      </Link>
    </article>
  );
}
