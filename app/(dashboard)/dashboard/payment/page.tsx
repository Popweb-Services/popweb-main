import Logo from "@/components/ui/logo"

import PaymentClient from "./payment-client"

interface PaymentPageProps {}

const PaymentPage: React.FC<PaymentPageProps> = ({}) => {
  return (
    <>
      <div dir="rtl" className="max-w-2xl space-y-4 pt-6 p-4 mx-auto">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <PaymentClient />
      </div>
    </>
  )
}

export default PaymentPage
