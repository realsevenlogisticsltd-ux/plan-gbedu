"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { ADMIN_COOKIE } from "@/lib/admin";

export async function adminLogin(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "ruby40";

  if (!password || password !== expected) {
    return { ok: false, error: "Incorrect password." };
  }

  (await cookies()).set(ADMIN_COOKIE, "granted", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

export async function adminLogout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect("/admin");
}

export async function setTributeApproved(id: string, isApproved: boolean) {
  await prisma.tribute.update({ where: { id }, data: { isApproved } });
  revalidatePath("/admin");
}

export async function setTributeFeatured(id: string, isFeatured: boolean) {
  await prisma.tribute.update({ where: { id }, data: { isFeatured } });
  revalidatePath("/admin");
}

export async function deleteTribute(id: string) {
  await prisma.tribute.delete({ where: { id } });
  revalidatePath("/admin");
}
