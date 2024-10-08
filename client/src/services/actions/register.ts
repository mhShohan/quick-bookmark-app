'use server'

import { config } from "@/utils/config";
import { FieldValues } from "react-hook-form";
import { cookies } from 'next/headers'


export const register = async (data: FieldValues) => {
  const res = await fetch(
    `${config.baseUrl}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );
  const result = await res.json();

  const cookieStore = cookies()

  if (result.success) {
    cookieStore.set('token', result.data.token)
  }

  return result;
};