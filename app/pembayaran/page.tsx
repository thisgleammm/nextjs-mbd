import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PembayaranData from "@/components/pembayaran-data";

export default async function PembayaranPage() {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <PembayaranData />
      </div>
    </div>
  );
}
