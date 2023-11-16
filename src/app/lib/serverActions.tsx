"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteRecord(id: string) {
  // throw new Error("Failed to Delete Invoice");
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/update-status/`,
      {
        id: id,
        status: "delete",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}
