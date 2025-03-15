// app/components/PegawaiData.js
import { getPembayaran } from "@/lib/data";
import PembayaranTable from "./pembayaran-tabel";

export default async function PembayaranData() {
  const pembayaran = await getPembayaran();
  return <PembayaranTable pembayaran={pembayaran} />;
}
