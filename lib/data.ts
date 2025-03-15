import { prisma } from "@/lib/prisma";

export const getPegawai = async () => {
  try {
    const pegawai = await prisma.pegawai.findMany();
    return pegawai;
  } catch (error) {
    throw new Error("Failed to fetch pegawai data");
  }
};
