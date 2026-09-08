import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export function Container({ className = "", children, ...rest }: Props) {
  return (
    <div className={`container-page ${className}`} {...rest}>
      {children}
    </div>
  );
}
