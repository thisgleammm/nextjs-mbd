"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { PlusIcon } from "@/components/icons";
import { Chip, ChipProps } from "@heroui/chip";
import { useAsyncList } from "@react-stately/data";
import { Spinner } from "@heroui/spinner";
import SplitText from "@/components/splittext";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { DeleteButtonPegawai, EditButtonPegawai } from "@/components/buttons";
import { Pegawai } from "@prisma/client";

interface PegawaiTableProps {
  pegawai: Pegawai[];
}

export default function PegawaiTable({ pegawai }: PegawaiTableProps) {
  const statusColorMap: Record<string, ChipProps["color"]> = {
    Aktif: "success",
    "Non-Aktif": "danger",
  };
  const [isLoading, setIsLoading] = React.useState(true);

  let list = useAsyncList({
    async load({ signal }) {
      setIsLoading(false);
      return {
        items: pegawai,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: (items as Pegawai[]).sort((a: Pegawai, b: Pegawai) => {
          // Berikan tipe eksplisit di sini
          let first = a[sortDescriptor.column as keyof Pegawai]; // Gunakan keyof Pegawai
          let second = b[sortDescriptor.column as keyof Pegawai]; // Gunakan keyof Pegawai
          let cmp =
            (parseInt(first as string) || first || "") <
            (parseInt(second as string) || second || "")
              ? -1
              : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full text-center mb-8">
        <SplitText
          text="Tabel Pegawai"
          className="text-5xl font-semibold"
          delay={20}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          threshold={0.2}
          rootMargin="-50px"
        />
        <div className="mt-8 flex justify-between items-center">
          <div className="flex-1 mr-4">
            {/* <Input
              isClearable
              classNames={{
                base: "w-full sm:max-w-[44%]",
                inputWrapper: "border-1",
              }}
              placeholder="Search by name..."
              size="sm"
              startContent={<SearchIcon className="text-default-300" />}
              value={filterValue}
              variant="bordered"
              onClear={() => setFilterValue("")}
              onValueChange={onSearchChange}
            /> */}
          </div>
          <Button
            as={Link}
            className="bg-foreground text-background"
            endContent={<PlusIcon />}
            size="sm"
            href="pegawai/create"
          >
            Tambah Data
          </Button>
        </div>
      </div>

      <Table
        aria-label="Tabel Data Pegawai"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader>
          <TableColumn key="nip" allowsSorting>
            NIP
          </TableColumn>
          <TableColumn key="fullname" allowsSorting>
            Nama Lengkap
          </TableColumn>
          <TableColumn>Jabatan dan Pangkat</TableColumn>
          <TableColumn key="statuspegawai" allowsSorting>
            Status
          </TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items as Pegawai[]}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(
            pegawai: Pegawai // Berikan tipe eksplisit di sini
          ) => (
            <TableRow key={pegawai.nip}>
              <TableCell>{pegawai.nip}</TableCell>
              <TableCell>{pegawai.fullname}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <p className="text-bold text-sm capitalize">
                    {pegawai.jabatan}
                  </p>
                  <p className="text-bold text-sm capitalize text-default-400">
                    {pegawai.pangkat}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={statusColorMap[pegawai.statuspegawai]}
                  size="sm"
                  variant="flat"
                >
                  {pegawai.statuspegawai}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <EditButtonPegawai id={pegawai.nip} />
                  <DeleteButtonPegawai id={pegawai.nip} />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
