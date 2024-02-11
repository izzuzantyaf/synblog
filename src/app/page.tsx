import { TypographyH1 } from "@/components/typography/h1";
import { Button } from "@/components/ui/button";
import { gorestService } from "@/modules/gorest/gorest.service";
import { picsumService } from "@/modules/picsum/picsum.service";
import Image from "next/image";

export default async function Home() {
  const postsData = await gorestService.getPosts();

  return (
    <main className="">
      {/* Navbar */}
      {/* <div className="navbar border-b p-[8px] h-[56px] flex gap-[8px]">
        <div className="brand shrink-0 font-bold">Synblog</div>
      </div> */}
      {/* end of Navbar */}

      <div className="p-[16px] pt-0 max-w-screen-lg mx-auto">
        <TypographyH1>Articles</TypographyH1>

        {/* Article list */}
        <div className="articles mt-[16px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[16px]">
          {postsData.posts.map(post => {
            const width = 640;
            const height = 360;

            return (
              <article key={post.id}>
                <Image
                  src={picsumService.getStaticRandomImageUrl(
                    post.id.toString(),
                    { width, height }
                  )}
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
                <p className="mb-4 text-slate-500 dark:text-slate-400">
                  {post.body}
                </p>
              </article>
            );
          })}
        </div>
        {/* end of Article list */}
      </div>
    </main>
  );
}
