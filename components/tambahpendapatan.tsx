"use client";
import React from "react";
import { Form, Input, Select, SelectItem } from "@heroui/react";
import { savePendapatan } from "@/lib/actions";
import { useActionState } from "react";
import { SubmitButton } from "@/components/buttons";
import { useRouter } from "next/navigation";

export default function CreateForm() {
  const [state, formAction] = useActionState(savePendapatan, null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const router = useRouter();

  const handleSubmitSuccess = () => {
    router.push("/pendapatan");
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
        label="Kode Pendapatan"
        labelPlacement="outside"
        name="kodependapatan"
        placeholder="Masukkan Kode Pendapatan"
        maxLength={5}
      />
      <Input
        isRequired
        label="Jenis Pendapatan"
        labelPlacement="outside"
        name="jenispendapatan"
        placeholder="Masukkan Jenis Pendapatan"
      />
      <div className="flex flex-col w-full">
        <SubmitButton label="save" onSubmitSuccess={handleSubmitSuccess} />
      </div>
    </Form>
  );
}
