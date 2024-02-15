import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/Avatar";

export default function ProfileCard({
  title,
  subTitle,
  avatarSrc,
}: {
  title?: string;
  subTitle?: string;
  avatarSrc?: string;
}) {
  const DEFAULT_TITLE = "Author";

  title = title ?? DEFAULT_TITLE;

  return (
    <div className="flex gap-[16px] items-center overflow-hidden text-ellipsis">
      <Avatar>
        <AvatarImage src={avatarSrc} />
        <AvatarFallback className="uppercase">{title[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{title}</p>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
          {subTitle}
        </p>
      </div>
    </div>
  );
}
