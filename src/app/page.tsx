"use client";
import { Navbar } from "@/components/organisms/Navbar";
import { SkeletonCard } from "@/components/atoms/SkeletonCard";
import { TypographyH1 } from "@/components/atoms/TypographyH1";
import { Button } from "@/components/atoms/Button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/molecules/Pagination";
import { useGetPosts } from "@/modules/gorest/gorest.hooks";
import { picsumService } from "@/modules/picsum/picsum.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ArticleCard from "@/components/molecules/ArticleCard";
import { Pagination as PaginationAntd } from "antd";

export default function Home() {
  const DEFAULT_PAGE = 1;
  const MAX_PAGE = 3;
  const PER_PAGE = 12;
  const searchParams = useSearchParams();
  const pageFromSearchParams = parseInt(searchParams?.get("page") as string);
  const [page, setPage] = useState(
    pageFromSearchParams ? pageFromSearchParams : DEFAULT_PAGE
  );
  const { isGetPostsLoading, getPostsError, getPostsData } = useGetPosts({
    page: page,
    per_page: PER_PAGE,
  });
  const router = useRouter();

  useEffect(() => {
    const pageFromSearchParams = parseInt(searchParams?.get("page") as string);
    // Mengubah current url tanpa reload
    if (pageFromSearchParams === 1) {
      router.replace("/");
    }
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
              const width = 320 * 2;
              const height = 180 * 2;

              return (
                <ArticleCard
                  key={post.id}
                  url={`/articles/${post.id}`}
                  title={post.title}
                  imageSrc={picsumService.getStaticRandomImageUrl(
                    post.id.toString(),
                    { width, height }
                  )}
                  imageAlt={picsumService.getStaticRandomImageUrl(
                    post.id.toString(),
                    { width, height }
                  )}
                  imageWidth={width}
                  imageHeight={height}
                />
              );
            })
          ) : (
            <>
              <p className="col-span-full">No articles</p>
            </>
          )}
        </div>

        {/* Article list pagination */}
        <PaginationAntd
          total={MAX_PAGE * PER_PAGE}
          defaultCurrent={page}
          pageSize={PER_PAGE}
          className="!mt-[16px] flex justify-center"
          onChange={page => {
            handlePagination(page);
          }}
        />
        {/* end of Article list pagination */}
        {/* end of Article list */}
      </div>
    </main>
  );
}
