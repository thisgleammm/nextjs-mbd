"use client";
import React from "react";
import { Form, Input, Select, SelectItem } from "@heroui/react";
import { savePembayaran } from "@/lib/actions";
import { useActionState } from "react";
import { SubmitButton } from "@/components/buttons";
import { useRouter } from "next/navigation";
import { useEffect, useState, SyntheticEvent } from "react";
import { getPegawai } from "@/lib/data";

export default function CreateForm() {
  const [pegawai, setPegawai] = useState("");
  const [state, formAction] = useActionState(savePembayaran, null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const router = useRouter();

  const handleSubmitSuccess = () => {
    router.push("/pembayaran");
  };

  const [pegawaiList, setPegawaiList] = useState<
    {
      nip: string;
      fullname: string | null;
      nokpj: string;
      nonpwp: string;
      pangkat: string;
      jabatan: string;
      statuspegawai: string;
      unitkerja: string | null;
    }[]
  >([]);

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-3"
      validationErrors={errors}
      action={formAction}
    >
      <Input
        isRequired
        label="Kode Pembayaran"
        labelPlacement="outside"
        name="kodepembayaran"
        placeholder="Masukkan Kode Pembayaran"
        maxLength={5}
      />
      <Select
        isRequired
        label="Nama Pegawai"
        labelPlacement="outside"
        name="nip"
        placeholder="--Pilih--"
        selectedKeys={pegawai ? [pegawai] : []} // Gunakan `selectedKeys` untuk mengatur nilai yang dipilih
        onChange={(e) => setPegawai(e.target.value)} // Atur nilai `pegawai` saat berubah
      >
        {pegawaiList.map((pegawai) => (
          <SelectItem key={pegawai.nip} id={pegawai.nip}>
            {pegawai.fullname || "N/A"}
          </SelectItem>
        ))}
      </Select>
      <Input
        isRequired
        label="Bulan Gaji"
        labelPlacement="outside"
        name="bulangaji"
        placeholder="Masukkan Bulan Gaji"
        maxLength={25}
      />
      <Input
        isRequired
        label="Total Penerimaan"
        labelPlacement="outside"
        name="totalpenerimaan"
        placeholder="Masukkan Total Penerimaan"
      />
      <Input
        isRequired
        label="Total Potongan"
        labelPlacement="outside"
        name="totalpotongan"
        placeholder="Masukkan Total Potongan"
      />
      <div className="flex flex-col w-full">
        <SubmitButton label="save" onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </Form>
  );
}
