"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(email: string, password: string) {
  if (email === "admin@admin.com" && password === "12341234") {
    cookies().set("session", "admin");
    redirect("/dashboard");
  } else {
    return "Invalid User or Password";
  }
}

export async function logout() {
  cookies().delete("session");
  redirect("/login");
}
