"use client"; // Tandai sebagai Client Component

import { useEffect } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Aurora from "@/components/aurora";
import SplitText from "@/components/splittext";

import { title, subtitle } from "@/components/primitives";

export default function DashboardPage() {
  useEffect(() => {
    // Nonaktifkan scrolling
    document.body.style.overflow = "hidden";

    // Bersihkan efek saat komponen di-unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* Background Aurora */}
      <div className="absolute top-0 left-0 w-full h-full z-0 filter blur-lg opacity-90">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* SplitText di Tengah Halaman */}
      <div className="flex justify-center items-center h-screen">
        <SplitText
          text="Welcome to Dashboard"
          className="text-6xl font-semibold text-center"
          delay={150}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          threshold={0.2}
          rootMargin="-50px"
        />
      </div>
    </>
  );
}
