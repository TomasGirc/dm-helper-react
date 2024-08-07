import Link from "next/link";
import { ReactNode } from "react";

export const ConditionalLink = ({
  children,
  link,
}: {
  children: ReactNode;
  link: string | undefined;
}) => {
  return link ? <Link href={link}>{children}</Link> : <>{children}</>;
};
