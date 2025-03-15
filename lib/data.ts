import { prisma } from "@/lib/prisma";

export const getPegawai = async () => {
  try {
    const pegawai = await prisma.pegawai.findMany();
    return pegawai;
  } catch (error) {
    throw new Error("Failed to fetch pegawai data");
  }
};

export const getPembayaran = async () => {
  try {
    const pembayaran = await prisma.pembayaran.findMany();
    return pembayaran;
  } catch (error) {
    throw new Error("Failed to fetch pembayaran data");
  }
};
