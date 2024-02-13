"use client";
import { Navbar } from "@/components/Navbar";
import { SkeletonCard } from "@/components/SkeletonCard";
import { TypographyH1 } from "@/components/typography/h1";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { useGetPosts } from "@/modules/gorest/gorest.hooks";
import { picsumService } from "@/modules/picsum/picsum.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const DEFAULT_PAGE = 1;
  const MAX_PAGE = 3;
  const searchParams = useSearchParams();
  const pageFromSearchParams = parseInt(searchParams?.get("page") as string);
  const [page, setPage] = useState(
    pageFromSearchParams ? pageFromSearchParams : DEFAULT_PAGE
  );
  const { isGetPostsLoading, getPostsError, getPostsData } = useGetPosts({
    page: page,
    per_page: 12,
  });
  const router = useRouter();

  useEffect(() => {
    const pageFromSearchParams = parseInt(searchParams?.get("page") as string);
    setPage(pageFromSearchParams ? pageFromSearchParams : DEFAULT_PAGE);
  }, [searchParams?.get("page")]);

  const handlePaginationPrevious = () => {
    if (page >= 2) {
      const url = new URL(window.location.origin);
      url.searchParams.append("page", (page - 1).toString());
      router.push(url.toString());
    }
  };

  const handlePagination = (page: number) => {
    const url = new URL(window.location.origin);
    url.searchParams.append("page", page.toString());
    router.push(url.toString());
  };

  const handlePaginationNext = () => {
    if (page < MAX_PAGE) {
      const url = new URL(window.location.origin);
      url.searchParams.append("page", (page + 1).toString());
      router.push(url.toString());
    }
  };

  return (
    <main className="">
      {/* Navbar */}
      <Navbar />
      {/* end of Navbar */}

      <div className="p-[16px] pt-0 mt-[24px] max-w-screen-lg mx-auto">
        <TypographyH1>Articles</TypographyH1>

        {/* Article list */}
        <div className="articles mt-[16px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[16px]">
          {isGetPostsLoading ? (
            Array(6)
              .fill(null)
              .map((_, index) => (
                <SkeletonCard key={index} className="w-full" />
              ))
          ) : getPostsError ? (
            <>
              <p className="col-span-full">Something went wrong</p>
            </>
          ) : getPostsData ? (
            getPostsData?.map(post => {
              const width = 320;
              const height = 180;

              return (
                <article key={post.id}>
                  <Link href={`/articles/${post.id}`}>
                    <Image
                      src={picsumService.getStaticRandomImageUrl(
                        post.id.toString(),
                        { width, height }
                      )}
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Vg8AAjEBV1arMJ8AAAAASUVORK5CYII="
                      className="mb-5 rounded-lg"
                      alt={picsumService.getStaticRandomImageUrl(
                        post.id.toString(),
                        { width, height }
                      )}
                      width={width}
                      height={height}
                    />
                    <h2 className="mb-2 text-xl font-bold leading-tight">
                      {post.title}
                    </h2>
                  </Link>
                </article>
              );
            })
          ) : (
            <>
              <p className="col-span-full">No articles</p>
            </>
          )}
        </div>

        {/* Article list pagination */}
        <Pagination className="mt-[16px]">
          <PaginationContent>
            <PaginationItem onClick={handlePaginationPrevious}>
              <PaginationPrevious className="cursor-pointer" />
            </PaginationItem>
            {Array(MAX_PAGE)
              .fill(null)
              .map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePagination(index + 1)}
                    isActive={index + 1 === page}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            <PaginationItem onClick={handlePaginationNext}>
              <PaginationNext className="cursor-pointer" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        {/* end of Article list pagination */}
        {/* end of Article list */}
      </div>
    </main>
  );
}
