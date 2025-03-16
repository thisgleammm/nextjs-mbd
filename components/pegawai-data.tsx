import { getPegawai } from "@/lib/data";
import PegawaiTable from "./pegawai-tabel";
import { Pegawai } from "@prisma/client";

export default async function PegawaiData() {
  const pegawai: Pegawai[] = await getPegawai();
  return <PegawaiTable pegawai={pegawai} />;
}
