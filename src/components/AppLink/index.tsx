import Link from "next/link";

type AppLinkProps = {
  href: string;
  children?: any;
  target?: string | undefined;
  rel?: string | undefined;
  onClick?: () => void;
};

const AppLink = ({
  href,
  children,
  target = undefined,
  rel = undefined,
  onClick,
  ...props
}: AppLinkProps) => {
  return (
    <Link href={href} {...props} onClick={onClick} rel={rel}>
      {children}
    </Link>
  );
};

export default AppLink;
