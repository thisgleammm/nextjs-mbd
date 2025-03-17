import React from "react";
import SplitText from "@/components/splittext";
import UpdateForm from "@/components/ubahpendapatan";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { getPendapatanById } from "@/lib/data";

type Params = Promise<{ id: string }>;

export default async function UpdatePendapatanPage(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;

  const pendapatan = await getPendapatanById(id);
  if (!pendapatan) {
    notFound();
  }

  // Periksa session
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full text-center mb-8">
        <SplitText
          text="Ubah Pendapatan"
          className="text-6xl font-semibold"
          delay={20}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          threshold={0.2}
          rootMargin="-50px"
        />
      </div>
      <div className="flex justify-center w-full">
        <UpdateForm pendapatan={pendapatan} />
      </div>
    </div>
  );
}
