import type { SVGProps } from "react";
import LogoSvg from "@/assets/Logo.svg";

type LogoProps = SVGProps<SVGSVGElement>;

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <LogoSvg
      className={className ?? "h-full w-full"}
      aria-label="The Action List"
      role="img"
      {...props}
    />
  );
}
