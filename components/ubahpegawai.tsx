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
  const router = useRouter();

  // const handleSubmitSuccess = () => {
  //   // Refresh halaman untuk memperbarui data
  //   router.push("/pegawai");
  //   router.refresh();
  // };

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
      />
      <Input
        isRequired
        label="No NPWP"
        labelPlacement="outside"
        name="nonpwp"
        placeholder="Masukkan No NPWP"
        defaultValue={pegawai.nonpwp}
      />
      <Input
        isRequired
        label="Jabatan"
        labelPlacement="outside"
        name="jabatan"
        placeholder="Masukkan Jabatan"
        defaultValue={pegawai.jabatan}
      />
      <Input
        isRequired
        label="Pangkat"
        labelPlacement="outside"
        name="pangkat"
        placeholder="Masukkan Pangkat"
        defaultValue={pegawai.pangkat}
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
