import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { isInternalHref } from "@/lib/navigation";

type SmartLinkProps = { href: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * One place that decides how a link navigates:
 * - app routes ("/...")  → next/link, client-side, layout + audio survive
 * - in-page hashes ("#") → plain anchor, native scroll, no navigation
 * - external / protocol  → plain anchor
 */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  if (isInternalHref(href)) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

export default SmartLink;
