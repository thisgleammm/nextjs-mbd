"use client";
import React from "react";
import { Form, Input, Select, SelectItem, NumberInput } from "@heroui/react";
import { savePegawai } from "@/lib/actions";
import { useActionState } from "react";
import { SubmitButton } from "@/components/buttons";

export const status = [
  { key: "Aktif", label: "Aktif" },
  { key: "Non-Aktif", label: "Non-Aktif" },
];

export const unitkerja = [{ key: "PT KAI", label: "PT KAI" }];

export default function UpdateForm() {
  const [state, formAction] = useActionState(savePegawai, null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Validasi
    const newErrors: Record<string, string> = {};
    if (!data.nip) {
      newErrors.nip = "NIP is required";
    }
    if (!data.fullname) {
      newErrors.fullname = "Nama Lengkap is required";
    }
    if (!data.nokpj) {
      newErrors.nokpj = "No KPJ is required";
    }
    if (!data.nonpwp) {
      newErrors.nonpwp = "No NPWP is required";
    }
    if (!data.pangkat) {
      newErrors.pangkat = "Pangkat is required";
    }
    if (!data.jabatan) {
      newErrors.jabatan = "Jabatan is required";
    }

    if (!data.statuspegawai) {
      newErrors.statuspegawai = "Status Pegawai is required";
    }
    if (!data.unitkerja) {
      newErrors.unitkerja = "Unit Kerja is required";
    }

    // Jika ada error, set state errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Reset errors jika validasi berhasil
    setErrors({});

    // Logika submit form (misalnya, kirim data ke API)
    console.log("Form data:", data);
  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-3"
      validationErrors={errors}
      onSubmit={onSubmit}
      action={formAction}
      method={"POST" as "post"}
      encType="multipart/form-data"
    >
      <NumberInput
        isRequired
        label="NIP"
        labelPlacement="outside"
        name="nip"
        placeholder="Masukkan NIP"
      />
      <Input
        isRequired
        label="Nama Lengkap"
        labelPlacement="outside"
        name="fullname"
        placeholder="Masukkan Nama Panjang"
      />
      <NumberInput
        isRequired
        label="No KPJ"
        labelPlacement="outside"
        name="nokpj"
        placeholder="Masukkan No KPJ"
      />
      <NumberInput
        isRequired
        label="No NPWP"
        labelPlacement="outside"
        name="nonpwp"
        placeholder="Masukkan No NPWP"
      />
      <Input
        isRequired
        label="Pangkat"
        labelPlacement="outside"
        name="pangkat"
        placeholder="Masukkan Pangkat"
      />
      <Input
        isRequired
        label="Jabatan"
        labelPlacement="outside"
        name="jabatan"
        placeholder="Masukkan Jabatan"
      />
      <Select
        isRequired
        label="Status Pegawai"
        labelPlacement="outside"
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
        placeholder="--Pilih--"
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
