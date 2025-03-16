export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Slip Gaji Manajemen Basis Data",
  description: "CRUD Management System for Employee Salary Slip",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Pegawai",
      href: "/pegawai",
    },
    {
      label: "Pendapatan",
      href: "/pendapatan",
    },
    {
      label: "Pembayaran",
      href: "/pembayaran",
    },
  ],
};
