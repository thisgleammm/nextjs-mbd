import { prisma } from "@/lib/prisma";

export const getPegawai = async () => {
  try {
    const pegawai = await prisma.pegawai.findMany({
      select: {
        nip: true,
        fullname: true,
        nokpj: true,
        nonpwp: true,
        jabatan: true,
        pangkat: true,
        statuspegawai: true,
        unitkerja: true,
      },
    });
    return pegawai;
  } catch (error) {
    console.error("Error fetching pegawai data:", error);
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

export const getPembayaranById = async (id: string) => {
  try {
    const pembayaran = await prisma.pembayaran.findUnique({
      where: { kodepembayaran: id },
    });
    return pembayaran;
  } catch (error) {
    throw new Error("Failed to fetch pemabayaran data");
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

export const getPendapatanById = async (id: string) => {
  try {
    const pendapatan = await prisma.pendapatan.findUnique({
      where: { kodependapatan: id },
    });
    return pendapatan;
  } catch (error) {
    throw new Error("Failed to fetch pendapatan data");
  }
};
