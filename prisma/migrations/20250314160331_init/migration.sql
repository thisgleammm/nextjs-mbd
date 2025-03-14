-- CreateTable
CREATE TABLE "DetailPembayaran" (
    "kodedetail" VARCHAR(5) NOT NULL,
    "kodependapatan" TEXT NOT NULL,
    "kodepembayaran" TEXT NOT NULL,
    "keterangan" VARCHAR(50) NOT NULL,
    "nominal" INTEGER NOT NULL,

    CONSTRAINT "DetailPembayaran_pkey" PRIMARY KEY ("kodedetail")
);

-- CreateTable
CREATE TABLE "Pembayaran" (
    "kodepembayaran" VARCHAR(5) NOT NULL,
    "nip" TEXT NOT NULL,
    "bulangaji" VARCHAR(25) NOT NULL,
    "totalpenerimaan" INTEGER NOT NULL,
    "totalpotongan" INTEGER NOT NULL,

    CONSTRAINT "Pembayaran_pkey" PRIMARY KEY ("kodepembayaran")
);

-- CreateTable
CREATE TABLE "Pendapatan" (
    "kodependapatan" VARCHAR(5) NOT NULL,
    "jenispendapatan" TEXT,

    CONSTRAINT "Pendapatan_pkey" PRIMARY KEY ("kodependapatan")
);

-- CreateTable
CREATE TABLE "Pegawai" (
    "nip" CHAR(10) NOT NULL,
    "fullname" TEXT,
    "nokpj" CHAR(7) NOT NULL,
    "nonpwp" CHAR(16) NOT NULL,
    "pangkat" VARCHAR(50) NOT NULL,
    "jabatan" VARCHAR(25) NOT NULL,
    "statuspegawai" VARCHAR(10) NOT NULL,
    "unitkerja" CHAR(6),

    CONSTRAINT "Pegawai_pkey" PRIMARY KEY ("nip")
);

-- AddForeignKey
ALTER TABLE "DetailPembayaran" ADD CONSTRAINT "DetailPembayaran_kodependapatan_fkey" FOREIGN KEY ("kodependapatan") REFERENCES "Pendapatan"("kodependapatan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPembayaran" ADD CONSTRAINT "DetailPembayaran_kodepembayaran_fkey" FOREIGN KEY ("kodepembayaran") REFERENCES "Pembayaran"("kodepembayaran") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pembayaran" ADD CONSTRAINT "Pembayaran_nip_fkey" FOREIGN KEY ("nip") REFERENCES "Pegawai"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;
