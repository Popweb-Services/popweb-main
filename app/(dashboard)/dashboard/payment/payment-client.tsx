"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { IoMdPricetag } from "react-icons/io"

import { priceFormatter } from "@/lib/formatter"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

interface PaymentClientProps {}

const PaymentClient: React.FC<PaymentClientProps> = ({}) => {
  const [selectedPlan, setSelectedPlan] = useState("12-mounths")
  const [bank, setBank] = useState("SAMAN")
  const [amount, setAmount] = useState<number>()
  useEffect(() => {
    if (selectedPlan === "12-mounths") {
      setAmount(192000000)
    } else if (selectedPlan === "3-mounths") {
      setAmount(60000000)
    }
  }, [selectedPlan])
  const { mutate: pay, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`https://ipg.vandar.io/api/v3/send`, {
        api_key: process.env.VANDAR_API_KEY,
        amount: amount,
        callback_url: "https://popweb.ir/payment/success",
        mobile_number: "09103406985",
        port: bank,
      })
      console.log(data)
    },
  })
  return (
    <>
      <div className="w-full space-y-4 bg-white p-4 border rounded-xl">
        <p className="font-semibold">نوع اشتراک</p>
        <RadioGroup
          onValueChange={(value) => setSelectedPlan(value)}
          defaultValue="12-mounths"
          dir="rtl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <RadioGroupItem value="3-mounths" />
              <p>فروشگاه سه ماهه</p>
            </div>
            <div className="flex items-center gap-x-2">
              <p>{priceFormatter(6000000)}</p>
              <p>تومان</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <RadioGroupItem value="12-mounths" />
              <p>فروشگاه یک ساله</p>
            </div>
            <div className="flex flex-col gap-y-1">
              <div className="flex text-sm justify-end items-center gap-x-2">
                <p className="line-through">{priceFormatter(24000000)}</p>
                <p>تومان</p>
              </div>
              <div className="flex items-center gap-x-2">
                <p>{priceFormatter(19200000)}</p>
                <p>تومان</p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>
      <div className="w-full flex items-center justify-between space-y-4 bg-white p-4 border rounded-xl">
        <div className="flex items-center gap-x-2">
          <IoMdPricetag className="text-textSecondary w-5 h-5 -scale-x-100" />
          <p>کد تخفیف</p>
        </div>
        <div className="flex items-center gap-x-2">
          <Input className="max-md:w-[150px]" />
          <Button className="bg-primaryPurple hover:bg-primaryPurple/90 rounded-lg">
            اعمال
          </Button>
        </div>
      </div>
      <div className="w-full space-y-4 bg-white p-4 border rounded-xl">
        <p>پیش فاکتور</p>
        <div className="flex items-center justify-between">
          <p>قیمت :</p>
          <div className="flex items-center gap-x-2">
            {selectedPlan === "12-mounths" && <p>{priceFormatter(24000000)}</p>}
            <p>تومان</p>
          </div>
        </div>
        <Separator />
        {selectedPlan === "12-mounths" && (
          <div className="flex items-center justify-between">
            <p>تخفیف :</p>
            <div className="flex items-center gap-x-2">
              <p>{priceFormatter(4800000)}</p>
              <p>تومان</p>
            </div>
          </div>
        )}
        <Separator />
        <div className="flex items-center justify-between">
          <p>قابل پرداخت :</p>
          <div className="flex items-center gap-x-2">
            {selectedPlan === "12-mounths" && <p>{priceFormatter(19200000)}</p>}
            <p>تومان</p>
          </div>
        </div>
      </div>
      <div className="w-full space-y-4 bg-white p-4 border rounded-xl">
        <p>انتخاب روش پرداخت</p>
        <RadioGroup
          onValueChange={(value) => setBank(value)}
          defaultValue="SAMAN"
          dir="rtl"
        >
          <div className="flex items-center gap-x-6">
            <div className="flex flex-col items-center gap-y-3">
              <div className="w-[60px] aspect-square">
                <Image
                  alt="saman bank logo"
                  src={"/images/saman-bank-logo.png"}
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex text-sm items-center gap-x-2">
                <RadioGroupItem value="SAMAN" />
                <p>درگاه بانک سامان</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-3">
              <div className="w-[60px] aspect-square">
                <Image
                  alt="saman bank logo"
                  src={"/images/mellat-bank-logo.png"}
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex text-sm items-center gap-x-2">
                <RadioGroupItem value="BEHPARDAKHT" />
                <p>درگاه بانک ملت</p>
              </div>
            </div>
          </div>
        </RadioGroup>
        <Button
          onClick={() => {
            pay()
          }}
          className="w-full rounded-lg text-white bg-primaryPurple hover:bg-primaryPurple/90"
        >
          پرداخت
        </Button>
      </div>
    </>
  )
}

export default PaymentClient
