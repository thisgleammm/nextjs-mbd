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
  const DeletePegawaiWithId = deletePegawai.bind(null, id);
  return (
    <form action={DeletePegawaiWithId}>
      <Tooltip color="danger" content="Delete Pegawai">
        <button
          type="submit"
          className="text-lg text-danger cursor-pointer active:opacity-50"
        >
          <DeleteIcon />
        </button>
      </Tooltip>
    </form>
  );
};

export const SubmitButton = ({
  label,
  onSubmitSuccess,
}: {
  label: string;
  onSubmitSuccess?: () => void;
}) => {
  const { pending } = useFormStatus();

  const handleClick = () => {
    if (onSubmitSuccess) {
      onSubmitSuccess(); // Panggil callback setelah submit
    }
  };

  return (
    <Button
      type="submit"
      variant="flat"
      className="bg-foreground text-background"
      disabled={pending}
      onPress={handleClick}
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
