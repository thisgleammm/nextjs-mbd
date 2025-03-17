"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const PegawaiSchema = z.object({
  nip: z.string(),
  fullname: z.string(),
  nokpj: z.string(),
  nonpwp: z.string(),
  pangkat: z.string(),
  jabatan: z.string(),
  statuspegawai: z.string(),
  unitkerja: z.string(),
});

const UpdatePegawaiSchema = z.object({
  nip: z.string().optional(),
  fullname: z.string(),
  nokpj: z.string(),
  nonpwp: z.string(),
  pangkat: z.string(),
  jabatan: z.string(),
  statuspegawai: z.string(),
  unitkerja: z.string(),
});

const PendapatanSchema = z.object({
  kodependapatan: z.string(),
  jenispendapatan: z.string(),
});

const UpdatePendapatanSchema = z.object({
  kodependapatan: z.string().optional(),
  jenispendapatan: z.string(),
});

const PembayaranSchema = z.object({
  kodepembayaran: z.string(),
  nip: z.string(),
  bulangaji: z.string(),
  totalpenerimaan: z.number(),
  totalpotongan: z.number(),
});

const UpdatePembayaranSchema = z.object({
  kodepembayaran: z.string().optional(),
  nip: z.string(),
  bulangaji: z.string(),
  totalpenerimaan: z.number(),
  totalpotongan: z.number(),
});

export const savePegawai = async (prevState: any, formData: FormData) => {
  console.log("FormData received:", Object.fromEntries(formData.entries()));

  const validatedFields = PegawaiSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.log(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log("Validated data:", validatedFields.data);

  try {
    await prisma.pegawai.create({
      data: {
        nip: validatedFields.data.nip,
        fullname: validatedFields.data.fullname,
        nokpj: validatedFields.data.nokpj,
        nonpwp: validatedFields.data.nonpwp,
        pangkat: validatedFields.data.pangkat,
        jabatan: validatedFields.data.jabatan,
        statuspegawai: validatedFields.data.statuspegawai,
        unitkerja: validatedFields.data.unitkerja,
      },
    });
    console.log("Pegawai created successfully");
  } catch (error) {
    console.error("Failed to create pegawai:", error);
  }

  revalidatePath("/pegawai");
  redirect("/pegawai");
};

export const savePendapatan = async (prevState: any, formData: FormData) => {
  console.log("FormData received:", Object.fromEntries(formData.entries()));

  const validatedFields = PendapatanSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.log(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log("Validated data:", validatedFields.data);

  try {
    await prisma.pendapatan.create({
      data: {
        kodependapatan: validatedFields.data.kodependapatan,
        jenispendapatan: validatedFields.data.jenispendapatan,
      },
    });
    console.log("Pendapatan created successfully");
  } catch (error) {
    console.error("Failed to create pendapatan:", error);
  }

  revalidatePath("/pendapatan");
  redirect("/pendapatan");
};

export const savePembayaran = async (prevState: any, formData: FormData) => {
  console.log("FormData received:", Object.fromEntries(formData.entries()));

  const validatedFields = PembayaranSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.log(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log("Validated data:", validatedFields.data);

  try {
    await prisma.pembayaran.create({
      data: {
        kodepembayaran: validatedFields.data.kodepembayaran,
        nip: validatedFields.data.nip,
        bulangaji: validatedFields.data.bulangaji,
        totalpenerimaan: validatedFields.data.totalpenerimaan,
        totalpotongan: validatedFields.data.totalpotongan,
      },
    });
    console.log("Pembayaran created successfully");
  } catch (error) {
    console.error("Failed to create pembayaran:", error);
  }

  revalidatePath("/pembayaran");
  redirect("/pembayaran");
};

export const updatePegawai = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  if (!id) {
    return { ...prevState, message: "ID is required" };
  }

  console.log("FormData received:", Object.fromEntries(formData.entries()));

  const validatedFields = UpdatePegawaiSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.log(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log("Validated data:", validatedFields.data);

  try {
    await prisma.pegawai.update({
      where: { nip: id },
      data: {
        fullname: validatedFields.data.fullname,
        nokpj: validatedFields.data.nokpj,
        nonpwp: validatedFields.data.nonpwp,
        pangkat: validatedFields.data.pangkat,
        jabatan: validatedFields.data.jabatan,
        statuspegawai: validatedFields.data.statuspegawai,
        unitkerja: validatedFields.data.unitkerja,
      },
    });

    console.log("Pegawai updated successfully");
  } catch (error) {
    console.error("Failed to update pegawai:", error);
  }
  revalidatePath("/pegawai");
  redirect("/pegawai");
};

export const updatePendapatan = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  if (!id) {
    return { ...prevState, message: "ID is required" };
  }

  console.log("FormData received:", Object.fromEntries(formData.entries()));

  const validatedFields = UpdatePendapatanSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.log(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log("Validated data:", validatedFields.data);

  try {
    await prisma.pendapatan.update({
      where: { kodependapatan: id },
      data: {
        jenispendapatan: validatedFields.data.jenispendapatan,
      },
    });

    console.log("Pendapatan updated successfully");
  } catch (error) {
    console.error("Failed to update pendapatan:", error);
  }
  revalidatePath("/pendapatan");
  redirect("/pendapatan");
};

export const updatePembayaran = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  if (!id) {
    return { ...prevState, message: "ID is required" };
  }

  console.log("FormData received:", Object.fromEntries(formData.entries()));

  const validatedFields = UpdatePembayaranSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    console.log(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  console.log("Validated data:", validatedFields.data);

  try {
    await prisma.pembayaran.update({
      where: { kodepembayaran: id },
      data: {
        nip: validatedFields.data.nip,
        bulangaji: validatedFields.data.bulangaji,
        totalpenerimaan: validatedFields.data.totalpenerimaan,
        totalpotongan: validatedFields.data.totalpotongan,
      },
    });

    console.log("Pembayaran updated successfully");
  } catch (error) {
    console.error("Failed to update pembayaran:", error);
  }
  revalidatePath("/pembayaran");
  redirect("/pembayaran");
};

export const deletePegawai = async (
  nip: string
): Promise<{ message: string }> => {
  if (!nip) {
    return { message: "ID is required" };
  }

  try {
    await prisma.pegawai.delete({
      where: { nip },
    });
    console.log("Pegawai deleted successfully");
  } catch (error) {
    console.error("Failed to delete pegawai:", error);
  }

  revalidatePath("/pegawai");
  redirect("/pegawai");
};

export const deletePendapatan = async (id: string) => {
  if (!id) {
    return { message: "ID is required" };
  }

  try {
    await prisma.pendapatan.delete({
      where: { kodependapatan: id },
    });
    console.log("Pendapatan deleted successfully");
  } catch (error) {
    console.error("Failed to delete pendapatan:", error);
  }

  revalidatePath("/pendapatan");
  redirect("/pendapatan");
};

export const deletePembayaran = async (id: string) => {
  if (!id) {
    return { message: "ID is required" };
  }

  try {
    await prisma.pembayaran.delete({
      where: { kodepembayaran: id },
    });
    console.log("pembayaran deleted successfully");
  } catch (error) {
    console.error("Failed to delete pembayaran:", error);
  }

  revalidatePath("/pembayaran");
  redirect("/pembayaran");
};
