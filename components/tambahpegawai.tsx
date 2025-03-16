"use client";
import React from "react";
import { Form, Input, Select, SelectItem, NumberInput } from "@heroui/react";
import { savePegawai } from "@/lib/actions";
import { useActionState } from "react";
import { SubmitButton } from "@/components/buttons";
import { useRouter } from "next/navigation";

export const status = [
  { key: "Aktif", label: "Aktif" },
  { key: "Non-Aktif", label: "Non-Aktif" },
];

export const unitkerja = [{ key: "PT KAI", label: "PT KAI" }];

export default function CreateForm() {
  const [state, formAction] = useActionState(savePegawai, null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const router = useRouter();

  const handleSubmitSuccess = () => {
    // Redirect ke halaman /pegawai setelah submit berhasil
    router.push("/pegawai");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Hapus karakter non-angka dari nilai input
    const value = e.target.value.replace(/\D/g, ""); // \D berarti non-digit
    e.target.value = value; // Set nilai input ke nilai yang sudah difilter
  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-3"
      validationErrors={errors}
      action={formAction}
    >
      <Input
        isRequired
        label="NIP"
        labelPlacement="outside"
        name="nip"
        placeholder="Masukkan NIP"
        type="number" // Gunakan type="number" untuk input angka
        onChange={handleInputChange} // Tambahkan event handler
      />
      <Input
        isRequired
        label="Nama Lengkap"
        labelPlacement="outside"
        name="fullname"
        placeholder="Masukkan Nama Panjang"
      />
      <Input
        isRequired
        label="No KPJ"
        labelPlacement="outside"
        name="nokpj"
        placeholder="Masukkan No KPJ"
        type="number" // Gunakan type="number" untuk input angka
        onChange={handleInputChange} // Tambahkan event handler
      />
      <Input
        isRequired
        label="No NPWP"
        labelPlacement="outside"
        name="nonpwp"
        placeholder="Masukkan No NPWP"
        type="number" // Gunakan type="number" untuk input angka
        onChange={handleInputChange} // Tambahkan event handler
      />
      <Input
        isRequired
        label="Jabatan"
        labelPlacement="outside"
        name="jabatan"
        placeholder="Masukkan Jabatan"
      />
      <Input
        isRequired
        label="Pangkat"
        labelPlacement="outside"
        name="pangkat"
        placeholder="Masukkan Pangkat"
      />
      <Select
        isRequired
        label="Status Pegawai"
        labelPlacement="outside"
        name="statuspegawai"
        placeholder="--Pilih--"
      >
        {status.map((statuspegawai) => (
          <SelectItem key={statuspegawai.key}>{statuspegawai.label}</SelectItem>
        ))}
      </Select>
      <Select
        isRequired
        label="Unit Kerja"
        labelPlacement="outside"
        name="unitkerja"
        placeholder="--Pilih--"
      >
        {unitkerja.map((unitkerja) => (
          <SelectItem key={unitkerja.key}>{unitkerja.label}</SelectItem>
        ))}
      </Select>
      <div className="flex flex-col w-full">
        <SubmitButton label="save" onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </Form>
  );
}
