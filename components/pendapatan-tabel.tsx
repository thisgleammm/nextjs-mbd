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
import { useAsyncList } from "@react-stately/data";
import { Spinner } from "@heroui/spinner";
import SplitText from "@/components/splittext";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  DeleteButtonPendapatan,
  EditButtonPendapatan,
} from "@/components/buttons";
import type { Pendapatan } from "@prisma/client";

interface PendapatanTableProps {
  pendapatan: Pendapatan[];
}

export default function PendapatanTable({ pendapatan }: PendapatanTableProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  let list = useAsyncList({
    async load({ signal }) {
      setIsLoading(false);
      return {
        items: pendapatan,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: (items as Pendapatan[]).sort((a: Pendapatan, b: Pendapatan) => {
          // Berikan tipe eksplisit di sini
          let first = a[sortDescriptor.column as keyof Pendapatan];
          let second = b[sortDescriptor.column as keyof Pendapatan];
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
      {/* Headline/Judul Tabel */}
      <div className="w-full text-center mb-8">
        <SplitText
          text="Tabel Pendapatan"
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
            href="pendapatan/create"
          >
            Tambah Data
          </Button>
        </div>
      </div>

      {/* Tabel */}
      <div className="w-full">
        <Table
          aria-label="Tabel Data Pendapatan"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
        >
          <TableHeader>
            <TableColumn key="kodependapatan" allowsSorting>
              Kode Pendapatan
            </TableColumn>
            <TableColumn key="jenispendapatan" allowsSorting>
              Jenis Pendapatan
            </TableColumn>
            <TableColumn>Aksi</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            items={list.items as Pendapatan[]}
            loadingContent={<Spinner label="Loading..." />}
          >
            {(
              pendapatan: Pendapatan // Berikan tipe eksplisit di sini
            ) => (
              <TableRow key={pendapatan.kodependapatan}>
                <TableCell>{pendapatan.kodependapatan}</TableCell>
                <TableCell>{pendapatan.jenispendapatan}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <EditButtonPendapatan id={pendapatan.kodependapatan} />
                    <DeleteButtonPendapatan id={pendapatan.kodependapatan} />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
