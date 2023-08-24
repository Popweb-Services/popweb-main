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

interface MultipleImageUploadProps {
  imageUrls: string[]
  onChange: (imageUrl: string) => void
  onRemoveFromImageUrls: (imageUrl: string) => void
  uploadLabel: string
}

type IParams = {
  storeId: string
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  imageUrls,
  onChange,
  onRemoveFromImageUrls,
  uploadLabel,
}) => {
  const params = useParams() as IParams
  const { toast } = useToast()
  const { mutate: deleteFile, isLoading: isDeletingFile } = useMutation({
    mutationFn: async (imageUrls: string) => {
      const splittedImageUrl = imageUrls.split("/")
      const fileKey = splittedImageUrl[splittedImageUrl.length - 1]
      await axios.delete(`/api/${params.storeId}/upload-image/${fileKey}`)
    },
    onSuccess: () => {},
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
      onChange(response.data.url)
    },
    onSuccess: () => {
      toast({
        description: "بنر با موفقیت آپلود شد.",
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
  const onDeleteImageFromBucket = (imageUrl: string) => {
    onRemoveFromImageUrls(imageUrl)
    deleteFile(imageUrl)
  }
  return (
    <>
      <div className="grid grid-cols-5 gap-2 relative z-0">
        {imageUrls?.map((imageUrl) => (
          <div
            key={imageUrl}
            className={cn(
              "relative border w-[120px] h-[120px] rounded-md overflow-hidden",
              isDeletingFile && "opacity-50"
            )}
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                disabled={isDeletingFile}
                type="button"
                variant="destructive"
                onClick={() => onDeleteImageFromBucket(imageUrl)}
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
          </div>
        ))}

        <div className="w-[120px] h-[120px] bg-white border-2 border-dashed cursor-pointer hover:bg-secondary flex items-center justify-center relative">
          <div className="flex text-sm text-primaryPurple items-center gap-x-2">
            {isLoading ? (
              <ImSpinner8 className="animate-spin" />
            ) : (
              <div className="flex items-center gap-x-2">
                <p>{uploadLabel}</p>
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
      </div>
    </>
  )
}

export default MultipleImageUpload
