import Link from "next/link"
import { CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface VerifySuccessClientProps {}

const VerifySuccessClient: React.FC<VerifySuccessClientProps> = ({}) => {
  return (
    <>
      <Card className="w-full py-14 px-12 flex flex-col space-y-6 items-center bg-white rounded-lg shadow-sm">
        <CheckCircle className="w-10 h-10-" />
        <p className="text-center text-lg">
          حساب کاربری شما با موفقیت فعال شد.
        </p>
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "default" }),
            "rounded-lg bg-primaryPurple hover:bg-primaryPurple/90"
          )}
        >
          ورود به پنل کاربری
        </Link>
      </Card>
    </>
  )
}

export default VerifySuccessClient
