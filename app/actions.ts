"use server"

import { pinata } from "./lib/config"

export async function deleteImage(fileId: string) {
  try {
    await pinata.files.delete([fileId])

    return {
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "Failed to delete file",
    }
  }
}
