import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Aurora from "@/components/aurora";
import Balatro from "@/components/balatrobg";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <div className="absolute top-0 left-0 w-full h-full z-0">
              {/* <Aurora
                colorStops={["#00D8FF", "#7CFF67", "#00D8FF"]}
                blend={1}
                amplitude={1.0}
                speed={0.5}
              /> */}
              <Balatro
                isRotate={false}
                mouseInteraction={false}
                pixelFilter={2000}
                color1="#3BB5DE"
              />
            </div>
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow z-10">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
