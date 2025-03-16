"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deletePegawai } from "@/lib/actions";
import { DeleteIcon, EditIcon, PlusIcon } from "./icons";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/react";

export const CreateButton = () => {
  return (
    <Link
      href="/contacts/create"
      className="inline-flex items-center space-x-1 text-white bg-blue-700 hover:bg-blue-800 px-5 py-[9px] rounded-sm text-sm"
    >
      <PlusIcon size={20} />
      Create
    </Link>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Tooltip content="Edit Pegawai">
      <Link href={`/pegawai/edit/${id}`}>
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon />
        </span>
      </Link>
    </Tooltip>
  );
};

export const DeleteButton = ({ id }: { id: string }) => {
  const DeleteContactWithId = deletePegawai.bind(null, id);
  return (
    <form action={DeleteContactWithId}>
      <button className="rounded-sm border p-1 hover:bg-gray-100">
        <DeleteIcon size={20} />
      </button>
    </form>
  );
};

export const SubmitButton = ({
  label,
  onSubmitSuccess,
}: {
  label: string;
  onSubmitSuccess?: () => void; // Callback setelah submit berhasil
}) => {
  const { pending } = useFormStatus();

  const className = clsx("bg-foreground text-background w-full text-center", {
    "opacity-50 cursor-progress": pending,
  });

  return (
    <Button
      type="submit"
      variant="flat"
      disabled={pending}
      className={className}
      onClick={onSubmitSuccess} // Panggil callback setelah submit
    >
      {label === "save"
        ? pending
          ? "Saving..."
          : "Save"
        : pending
          ? "Updating..."
          : "Update"}
    </Button>
  );
};
