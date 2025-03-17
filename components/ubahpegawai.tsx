"use client";

import React from "react";
import { Form, Input, Select, SelectItem } from "@heroui/react";
import { updatePegawai } from "@/lib/actions";
import { useActionState } from "react";
import { SubmitButton } from "@/components/buttons";
import { useRouter } from "next/navigation";
import type { Pegawai } from "@prisma/client";

export const status = [
  { key: "Aktif", label: "Aktif" },
  { key: "Non-Aktif", label: "Non-Aktif" },
];

export const unitkerja = [{ key: "PT KAI", label: "PT KAI" }];

export default function UpdateForm({ pegawai }: { pegawai: Pegawai }) {
  const UpdatePegawaiWithId = updatePegawai.bind(null, pegawai.nip);
  const [state, formAction] = useActionState(UpdatePegawaiWithId, null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Hapus karakter non-angka dari nilai input
    const value = e.target.value.replace(/\D/g, ""); // \D berarti non-digit
    e.target.value = value; // Set nilai input ke nilai yang sudah difilter
  };

  return (
    <Form className="w-full max-w-xs flex flex-col gap-3" action={formAction}>
      <Input
        isReadOnly
        isDisabled
        label="NIP"
        labelPlacement="outside"
        name="nip"
        placeholder="Masukkan NIP"
        defaultValue={pegawai.nip}
      />
      <Input
        isRequired
        label="Nama Lengkap"
        labelPlacement="outside"
        name="fullname"
        placeholder="Masukkan Nama Panjang"
        defaultValue={pegawai.fullname ?? ""}
      />
      <Input
        isRequired
        label="No KPJ"
        labelPlacement="outside"
        name="nokpj"
        placeholder="Masukkan No KPJ"
        defaultValue={pegawai.nokpj}
        onChange={handleInputChange} // Tambahkan event handler
        maxLength={7} // Batasi panjang input hingga 7 karakter
      />
      <Input
        isRequired
        label="No NPWP"
        labelPlacement="outside"
        name="nonpwp"
        placeholder="Masukkan No NPWP"
        defaultValue={pegawai.nonpwp}
        onChange={handleInputChange} // Tambahkan event handler
        maxLength={16} // Batasi panjang input hingga 16 karakter
      />
      <Input
        isRequired
        label="Jabatan"
        labelPlacement="outside"
        name="jabatan"
        placeholder="Masukkan Jabatan"
        defaultValue={pegawai.jabatan}
        maxLength={25}
      />
      <Input
        isRequired
        label="Pangkat"
        labelPlacement="outside"
        name="pangkat"
        placeholder="Masukkan Pangkat"
        defaultValue={pegawai.pangkat}
        maxLength={50}
      />
      <Select
        isRequired
        label="Status Pegawai"
        labelPlacement="outside"
        placeholder="--Pilih--"
        name="statuspegawai"
        defaultSelectedKeys={[pegawai.statuspegawai]}
      >
        {status.map((statuspegawai) => (
          <SelectItem key={statuspegawai.key}>{statuspegawai.label}</SelectItem>
        ))}
      </Select>
      <Select
        isRequired
        label="Unit Kerja"
        labelPlacement="outside"
        placeholder="--Pilih--"
        name="unitkerja"
        defaultSelectedKeys={pegawai.unitkerja ? [pegawai.unitkerja] : []}
      >
        {unitkerja.map((unitkerja) => (
          <SelectItem key={unitkerja.key}>{unitkerja.label}</SelectItem>
        ))}
      </Select>
      <div className="flex flex-col w-full">
        <SubmitButton label="update" />
      </div>
    </Form>
  );
}
