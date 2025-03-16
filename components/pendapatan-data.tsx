// app/components/PegawaiData.js
import { getPendapatan } from "@/lib/data";
import PendapatanTable from "./pendapatan-tabel";

export default async function PendapatanData() {
  const pendapatan = await getPendapatan();
  return <PendapatanTable pendapatan={pendapatan} />;
}
