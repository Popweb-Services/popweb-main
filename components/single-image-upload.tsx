"use client"

import fs from "fs"
import { blob } from "stream/consumers"
import { ChangeEvent } from "react"
import { headers } from "next/dist/client/components/headers"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Trash, Upload } from "lucide-react"
import { ImSpinner8 } from "react-icons/im"

import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface SingleImageUploadProps {
  label: string
  imageUrl?: string
  onChange: (imageUrl: string) => void
  onRemove: () => void
}

type IParams = {
  storeId: string
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  label,
  imageUrl,
  onChange,
}) => {
  const params = useParams() as IParams
  const { toast } = useToast()
  const { mutate: deleteFile, isLoading: isDeletingFile } = useMutation({
    mutationFn: async (imageUrl: string) => {
      const splittedImageUrl = imageUrl.split("/")
      const fileKey = splittedImageUrl[splittedImageUrl.length - 1]
      await axios.delete(`/api/${params.storeId}/upload-image/${fileKey}`)
    },
    onSuccess: () => {
      onChange("")
    },
  })
  const { mutate: uploadImage, isLoading } = useMutation({
    mutationFn: async (imageFile: File) => {
      const file = new Blob([imageFile], { type: imageFile.type })
      const response: any = await axios.post(
        `/api/${params.storeId}/upload-image`,
        {
          file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log(response.data.url)
      onChange(response.data.url)
    },
    onSuccess: () => {
      toast({
        description: "عکس با موفقیت آپلود شد.",
      })
    },
    onError: () => {
      toast({
        title: "خطای سیستمی",
        description: "لطفا بعدا دوباره تلاش کنید و یا با پشتیبانی تماس بگیرید",
        variant: "destructive",
      })
    },
  })
  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return null
    }
    uploadImage(e.target.files[0])
  }
  const onRemove = () => {
    deleteFile(imageUrl!)
  }
  return (
    <>
      <div className="">
        <div
          className={cn(
            "relative border w-[120px] h-[120px] rounded-md overflow-hidden",
            isDeletingFile && "opacity-50"
          )}
        >
          {imageUrl ? (
            <>
              {isDeletingFile && (
                <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <ImSpinner8 className=" animate-spin" />
                </div>
              )}
              <div className="z-10 absolute top-2 right-2">
                <Button
                  disabled={isDeletingFile}
                  type="button"
                  variant="destructive"
                  onClick={onRemove}
                  size="icon"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
              <Image
                src={imageUrl}
                alt="Image"
                className=" object-contain object-center"
                fill
              />
            </>
          ) : (
            <div className="w-full h-full bg-white border-2 border-dashed cursor-pointer hover:bg-secondary flex items-center justify-center relative">
              <div className="flex text-sm text-primaryPurple items-center gap-x-2">
                {isLoading ? (
                  <ImSpinner8 className="animate-spin" />
                ) : (
                  <div className="flex items-center gap-x-2">
                    <p>{label}</p>
                    <Upload className="w-4 h-4" />
                  </div>
                )}
              </div>
              <Input
                accept="image/*"
                disabled={isLoading}
                onChange={onUpload}
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 disabled:opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SingleImageUpload
