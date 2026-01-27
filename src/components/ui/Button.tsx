import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-60";

const variantStyles: Record<Variant, string> = {
  primary:
    "border-transparent bg-gradient-to-r from-cyan-400/90 via-cyan-300/80 to-fuchsia-400/80 text-black shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:shadow-[0_0_45px_rgba(168,85,247,0.35)]",
  outline:
    "border-cyan-300/30 bg-white/5 text-white hover:border-cyan-300/70 hover:bg-cyan-300/10",
  ghost: "border-transparent bg-transparent text-white hover:bg-white/5",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const classNames = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (href) {
    const isExternal = external ?? href.startsWith("http");

    if (isExternal) {
      return (
        <a
          className={classNames}
          href={href}
          target={props.target ?? "_blank"}
          rel={props.rel ?? "noreferrer"}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <Link className={classNames} href={href} {...(props as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={(props as React.ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button"}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
