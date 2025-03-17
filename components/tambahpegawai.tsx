"use client";
import React from "react";
import { Form, Input, Select, SelectItem } from "@heroui/react";
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
        onChange={handleInputChange} // Tambahkan event handler
        maxLength={10} // Batasi panjang input hingga 10 karakter
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
        onChange={handleInputChange} // Tambahkan event handler
        maxLength={7} // Batasi panjang input hingga 7 karakter
      />
      <Input
        isRequired
        label="No NPWP"
        labelPlacement="outside"
        name="nonpwp"
        placeholder="Masukkan No NPWP"
        onChange={handleInputChange} // Tambahkan event handler
        maxLength={16} // Batasi panjang input hingga 16 karakter
      />
      <Input
        isRequired
        label="Jabatan"
        labelPlacement="outside"
        name="jabatan"
        placeholder="Masukkan Jabatan"
        maxLength={25}
      />
      <Input
        isRequired
        label="Pangkat"
        labelPlacement="outside"
        name="pangkat"
        placeholder="Masukkan Pangkat"
        maxLength={50}
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
