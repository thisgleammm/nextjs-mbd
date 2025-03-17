"use client";
import { useSession } from "next-auth/react";
import NextLink from "next/link";
import clsx from "clsx";
import { link as linkStyles } from "@heroui/theme";
import { NavbarItem } from "@heroui/navbar";
import { usePathname } from "next/navigation";

export default function Content() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  return user ? (
    <ul className="hidden lg:flex gap-4 justify-start ml-2">
      <NavbarItem isActive={pathname === "/dashboard"}>
        <NextLink
          className={clsx(
            linkStyles({
              color: pathname === "/dashboard" ? "secondary" : "foreground",
            }),
            "data-[active=true]:text-primary data-[active=true]:font-medium"
          )}
          href="/dashboard"
        >
          Dashboard
        </NextLink>
      </NavbarItem>
      <NavbarItem isActive={pathname === "/pegawai"}>
        <NextLink
          className={clsx(
            linkStyles({
              color: pathname === "/pegawai" ? "secondary" : "foreground",
            }),
            "data-[active=true]:text-primary data-[active=true]:font-medium"
          )}
          href="/pegawai"
        >
          Pegawai
        </NextLink>
      </NavbarItem>
      <NavbarItem isActive={pathname === "/pendapatan"}>
        <NextLink
          className={clsx(
            linkStyles({
              color: pathname === "/pendapatan" ? "secondary" : "foreground",
            }),
            "data-[active=true]:text-primary data-[active=true]:font-medium"
          )}
          href="/pendapatan"
        >
          Pendapatan
        </NextLink>
      </NavbarItem>
      <NavbarItem isActive={pathname === "/pembayaran"}>
        <NextLink
          className={clsx(
            linkStyles({
              color: pathname === "/pembayaran" ? "secondary" : "foreground",
            }),
            "data-[active=true]:text-primary data-[active=true]:font-medium"
          )}
          href="/pembayaran"
        >
          Pembayaran
        </NextLink>
      </NavbarItem>
    </ul>
  ) : null;
}
