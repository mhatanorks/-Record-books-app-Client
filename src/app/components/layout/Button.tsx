"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Button = ({
  href,
  icon,
  page,
}: {
  href: string;
  icon: any;
  page: string;
}) => {
  const pathname = usePathname();

  const isActive = pathname === href;
  return (
    <Link href={href}>
      <button
        className={clsx(
          "px-7 py-2 mx-3 rounded-lg font-bold text-xl",
          { "bg-green-400 text-white": isActive },
          { "bg-teal-50": !isActive }
        )}
      >
        <Image
          src={icon}
          alt={icon}
          width={40}
          height={40}
          className="rounded"
        />
        {page}
      </button>
    </Link>
  );
};

export default Button;
