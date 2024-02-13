import React from "react";

const TypographyH4 = React.forwardRef<
  HTMLHeadingElement,
  React.ButtonHTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  return (
    <h4
      ref={ref}
      className="scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  );
});
TypographyH4.displayName = "TypographyH4";

export { TypographyH4 };
