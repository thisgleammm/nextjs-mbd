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
    return { ...prevState, message: "Pegawai created successfully" };
  } catch (error) {
    console.error("Failed to create pegawai:", error);
  }

  revalidatePath("/pegawai");
  redirect("/pegawai");
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
    await prisma.pegawai.update({
      where: { nip: id },
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
    console.log("Pegawai updated successfully");
    return { ...prevState, message: "Pegawai updated successfully" };
  } catch (error) {
    console.error("Failed to update pegawai:", error);
  }

  revalidatePath("/pegawai");
  redirect("/pegawai");
};

export const deletePegawai = async (id: string) => {
  if (!id) {
    return { message: "ID is required" };
  }

  try {
    await prisma.pegawai.delete({
      where: { nip: id },
    });
    console.log("Pegawai deleted successfully");
    return { message: "Pegawai deleted successfully" };
  } catch (error) {
    console.error("Failed to delete pegawai:", error);
  }

  revalidatePath("/pegawai");
};
