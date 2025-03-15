// app/components/PegawaiData.js
import { getPegawai } from "@/lib/data";
import PegawaiTable from "./pegawai-tabel";

export default async function PegawaiData() {
  const pegawai = await getPegawai();
  return <PegawaiTable pegawai={pegawai} />;
}
