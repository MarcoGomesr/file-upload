"use client"

import { deleteImage } from "@/app/actions"
import { pinata } from "@/app/lib/config"
import { cn } from "@/app/lib/utils"
import { Loader2, XIcon } from "lucide-react"
import Image from "next/image"
import React, { useCallback, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import { toast } from "sonner"
import { Button } from "./Button"
import { DeleteButton } from "./DeleteButton"

export function Dropzone() {
  const [files, setFiles] = useState<
    Array<{ file: File; uploading: boolean; id?: string }>
  >([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) => ({ file, uploading: false })),
      ])
    }
    acceptedFiles.forEach(uploadFile)
  }, [])

  const rejectedFiles = useCallback((fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const manyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      )

      const fileSizetoBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      )

      if (manyFiles) {
        toast.error("Too many files selected, max is 5")
      }

      if (fileSizetoBig) {
        toast.error("File size exceed 5mb")
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: rejectedFiles,
    maxFiles: 5,
    maxSize: 1024 * 5,
    accept: {
      "image/*": [],
    },
  })

  const uploadFile = async (file: File) => {
    try {
      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.file === file ? { ...f, upload: true } : f))
      )

      const keyRequest = await fetch("/api/key")
      const keyData = await keyRequest.json()
      const { id } = await pinata.upload.file(file).key(keyData.JWT)

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file === file ? { ...f, upload: false, id } : f
        )
      )

      toast.success(`File ${file.name} uploaded successfully`)
    } catch (error) {
      console.log(error)

      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.file === file ? { ...f, upload: false } : f))
      )

      toast.error("Something went wrong")
    }
  }

  const removeFile = async (fieldId: string, fieldName: string) => {
    if (fieldId) {
      const result = await deleteImage(fieldId)

      if (result.success) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fieldId))
        toast.success(`File ${fieldName} deleted successfully`)
      } else {
        toast.error("Error deleting File...")
      }
    }
  }

  return (
    <>
      <div
        {...getRootProps({
          className: "p-16 mt-10 border-dashed rounded-lg border-2",
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center gap-y-3">
            <p>Drag 'n' drop some files here, or click to select files</p>
            <Button>Select Files</Button>
          </div>
        )}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {files.map(({ file, uploading, id }) => (
          <div key={file.name} className="relative w-full group">
            <div>
              <Image
                src={URL.createObjectURL(file)}
                alt={""}
                width={200}
                height={200}
                className={cn(
                  uploading ? "opacity-50" : "",
                  "rounded-lg object-cover size-32"
                )}
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center">
                  <Loader2 className="size-6 animate-spin text-primary" />
                </div>
              )}
            </div>
            <form
              action={() => removeFile(id!, file.name)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity "
            >
              <DeleteButton />
            </form>

            <p className="mt-2 text-sm text-gray-500 truncate">{file.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}
