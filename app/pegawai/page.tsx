import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PegawaiData from "@/components/pegawai-data";

export default async function PegawaiPage() {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <PegawaiData />
      </div>
    </div>
  );
}
