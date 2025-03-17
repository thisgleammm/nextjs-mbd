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
import { Tooltip } from "@heroui/tooltip";
import { EditIcon, DeleteIcon, PlusIcon, SearchIcon } from "@/components/icons";
import { useAsyncList } from "@react-stately/data";
import { Spinner } from "@heroui/spinner";
import SplitText from "@/components/splittext";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { EditButtonPembayaran, DeleteButtonPembayaran } from "./buttons";

interface Pembayaran {
  kodepembayaran: string;
  fullname: string;
  bulangaji: string;
  totalpenerimaan: number;
  totalpotongan: number;
}

interface PembayaranTableProps {
  pembayaran: Pembayaran[];
}

export default function PembayaranTable({ pembayaran }: PembayaranTableProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  let list = useAsyncList({
    async load({ signal }) {
      setIsLoading(false);
      return {
        items: pembayaran,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: (items as Pembayaran[]).sort((a: Pembayaran, b: Pembayaran) => {
          // Berikan tipe eksplisit di sini
          let first = a[sortDescriptor.column as keyof Pembayaran];
          let second = b[sortDescriptor.column as keyof Pembayaran];
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
          text="Tabel Pembayaran"
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
            href="pembayaran/create"
          >
            Tambah Data
          </Button>
        </div>
      </div>

      {/* Tabel */}
      <div className="w-full">
        <Table
          aria-label="Tabel Data Pembayaran"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
        >
          <TableHeader>
            <TableColumn key="kodepembayaran" allowsSorting>
              Kode Pembayaran
            </TableColumn>
            <TableColumn key="fullname" allowsSorting>
              Nama Pegawai
            </TableColumn>
            <TableColumn>Bulan Gaji</TableColumn>
            <TableColumn key="totalpenerimaan" allowsSorting>
              Total Penerimaan
            </TableColumn>
            <TableColumn key="totalpotongan" allowsSorting>
              Total Potongan
            </TableColumn>
            <TableColumn>Aksi</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            items={list.items as Pembayaran[]}
            loadingContent={<Spinner label="Loading..." />}
          >
            {(
              pembayaran: Pembayaran // Berikan tipe eksplisit di sini
            ) => (
              <TableRow key={pembayaran.kodepembayaran}>
                <TableCell>{pembayaran.kodepembayaran}</TableCell>
                <TableCell>{pembayaran.fullname}</TableCell>
                <TableCell>{pembayaran.bulangaji}</TableCell>
                <TableCell>
                  {formatCurrency(pembayaran.totalpenerimaan)}
                </TableCell>
                <TableCell>
                  {formatCurrency(pembayaran.totalpotongan)}
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <EditButtonPembayaran id={pembayaran.kodepembayaran} />
                    <DeleteButtonPembayaran id={pembayaran.kodepembayaran} />
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
