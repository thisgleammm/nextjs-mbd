"use client";

import React from "react";
import { Form, Input } from "@heroui/react";
import { updatePendapatan } from "@/lib/actions";
import { useActionState } from "react";
import { SubmitButton } from "@/components/buttons";
import type { Pendapatan } from "@prisma/client";

export default function UpdateForm({ pendapatan }: { pendapatan: Pendapatan }) {
  const UpdatePendapatanWithId = updatePendapatan.bind(
    null,
    pendapatan.kodependapatan
  );
  const [state, formAction] = useActionState(UpdatePendapatanWithId, null);

  return (
    <Form className="w-full max-w-xs flex flex-col gap-3" action={formAction}>
      <Input
        isReadOnly
        isDisabled
        label="Kode Pendapatan"
        labelPlacement="outside"
        name="kodependapatan"
        placeholder="Masukkan Kode Pendapatan"
        defaultValue={pendapatan.kodependapatan}
      />
      <Input
        isRequired
        label="Jenis Pendapatan"
        labelPlacement="outside"
        name="jenispendapatan"
        placeholder="Masukkan Jenis Pendapatan"
        defaultValue={pendapatan.jenispendapatan ?? ""}
      />
      <div className="flex flex-col w-full">
        <SubmitButton label="update" />
      </div>
    </Form>
  );
}
