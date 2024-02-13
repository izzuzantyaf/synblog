"use client";
import { SkeletonCard } from "@/components/atoms/SkeletonCard";
import { TypographyH1 } from "@/components/atoms/TypographyH1";
import { useGetPost, useGetUser } from "@/modules/gorest/gorest.hooks";
import { picsumService } from "@/modules/picsum/picsum.service";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/Avatar";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/organisms/Navbar";
import BackButton from "@/components/atoms/BackButton";
import ProfileCard from "@/components/molecules/ProfileCard";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const { isGetPostLoading, getPostError, getPostData } = useGetPost(
    parseInt(params.id)
  );

  const { isGetUserLoading, getUserData, getUserError } = useGetUser(
    getPostData?.user_id as number
  );
  const USER_NAME_FALLBACK = "Author";

  const imageWidth = 640 * 2;
  const imageHeight = 240 * 2;

  return (
    <>
      <main className="">
        {/* Navbar */}
        <Navbar />
        {/* end of Navbar */}

        <div className="px-[16px] pb-0 max-w-screen-lg mx-auto">
          <BackButton />
        </div>

        <div className="p-[16px] pt-0 mt-[16px] max-w-screen-lg mx-auto">
          {isGetPostLoading ? (
            <SkeletonCard className="w-full h-[360px]" />
          ) : getPostError ? (
            <p className="text-center">Something went wrong</p>
          ) : getPostData ? (
            <>
              <Image
                src={picsumService.getStaticRandomImageUrl(
                  getPostData.id.toString(),
                  {
                    width: imageWidth,
                    height: imageHeight,
                  }
                )}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Vg8AAjEBV1arMJ8AAAAASUVORK5CYII="
                className="mb-5 rounded-lg"
                alt={picsumService.getStaticRandomImageUrl(
                  getPostData.id.toString(),
                  {
                    width: imageWidth,
                    height: imageHeight,
                  }
                )}
                width={imageWidth}
                height={imageHeight}
              />
              <TypographyH1>{getPostData.title}</TypographyH1>
              <div className="flex gap-[16px] mt-[16px] items-center">
                <ProfileCard
                  title={getUserData?.name}
                  subTitle={getUserData?.email}
                  avatarSrc="https://github.com/shadcn.png"
                />
                <div>
                  <p className="font-medium">
                    {getUserData?.name ?? USER_NAME_FALLBACK}
                  </p>
                  <p>{getUserData?.email}</p>
                </div>
              </div>

              <p className="mt-[32px]">{getPostData.body}</p>
            </>
          ) : (
            <p className="text-center">No data</p>
          )}
        </div>
      </main>
    </>
  );
}
