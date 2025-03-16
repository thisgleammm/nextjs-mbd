import React from "react";
import SplitText from "@/components/splittext";
import UpdateForm from "@/components/ubahpegawai";

export default function UpdatePegawaiPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full text-center mb-8">
        <SplitText
          text="Ubah Pegawai"
          className="text-6xl font-semibold"
          delay={20}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          threshold={0.2}
          rootMargin="-50px"
        />
      </div>
      <div className="flex justify-center w-full">
        <UpdateForm />
      </div>
    </div>
  );
}
