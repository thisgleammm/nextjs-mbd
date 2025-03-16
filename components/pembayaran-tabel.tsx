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
import { EditIcon, DeleteIcon } from "@/components/icons";
import { useAsyncList } from "@react-stately/data";
import { Spinner } from "@heroui/spinner";
import SplitText from "@/components/splittext";

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
          let first = a[sortDescriptor.column as keyof Pembayaran]; // Gunakan keyof Pegawai
          let second = b[sortDescriptor.column as keyof Pembayaran]; // Gunakan keyof Pegawai
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
          className="text-6xl font-semibold"
          delay={20}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          threshold={0.2}
          rootMargin="-50px"
        />
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
                <TableCell>{pembayaran.totalpenerimaan}</TableCell>
                <TableCell>{pembayaran.totalpotongan}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit user">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                      </span>
                    </Tooltip>
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
