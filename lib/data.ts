import { prisma } from "@/lib/prisma";

export const getPegawai = async () => {
  try {
    const pegawai = await prisma.pegawai.findMany();
    return pegawai;
  } catch (error) {
    throw new Error("Failed to fetch pegawai data");
  }
};

export const getPegawaiById = async (id: string) => {
  try {
    const pegawai = await prisma.pegawai.findUnique({
      where: { nip: id },
    });
    return pegawai;
  } catch (error) {
    throw new Error("Failed to fetch pegawai data");
  }
};

export const getPembayaran = async () => {
  try {
    const pembayaran = await prisma.pembayaran.findMany({
      include: {
        pegawai: {
          select: {
            fullname: true,
          },
        },
      },
    });

    const formattedPembayaran = pembayaran.map((item) => ({
      ...item,
      fullname: item.pegawai?.fullname || "N/A",
    }));

    return formattedPembayaran;
  } catch (error) {
    throw new Error("Failed to fetch pembayaran data");
  }
};

export const getPendapatan = async () => {
  try {
    const pendapatan = await prisma.pendapatan.findMany();
    return pendapatan;
  } catch (error) {
    throw new Error("Failed to fetch pendapatan data");
  }
};
