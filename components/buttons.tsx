"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import {
  deletePegawai,
  deletePendapatan,
  deletePembayaran,
} from "@/lib/actions";
import { DeleteIcon, EditIcon } from "./icons";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/react";

export const EditButtonPegawai = ({ id }: { id: string }) => {
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

export const DeleteButtonPegawai = ({ id }: { id: string }) => {
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

export const EditButtonPendapatan = ({ id }: { id: string }) => {
  return (
    <Tooltip content="Edit Pendapatan">
      <Link href={`/pendapatan/edit/${id}`}>
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon />
        </span>
      </Link>
    </Tooltip>
  );
};

export const DeleteButtonPendapatan = ({ id }: { id: string }) => {
  const DeletePendapatanWithId = deletePendapatan.bind(null, id);
  return (
    <form action={DeletePendapatanWithId}>
      <Tooltip color="danger" content="Delete Pendapatan">
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

export const EditButtonPembayaran = ({ id }: { id: string }) => {
  return (
    <Tooltip content="Edit Pembayaran">
      <Link href={`/pembayaran/edit/${id}`}>
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon />
        </span>
      </Link>
    </Tooltip>
  );
};

export const DeleteButtonPembayaran = ({ id }: { id: string }) => {
  const DeletePembayaranWithId = deletePembayaran.bind(null, id);
  return (
    <form action={DeletePembayaranWithId}>
      <Tooltip color="danger" content="Delete Pembayaran">
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
