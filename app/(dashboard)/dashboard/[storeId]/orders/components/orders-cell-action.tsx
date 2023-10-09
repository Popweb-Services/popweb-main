"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface OrdersCellActionProps {
  customerId: string
}

const OrdersCellAction: React.FC<OrdersCellActionProps> = ({ customerId }) => {
  const pathname = usePathname()
  return (
    <>
      <Link
        className="underline text-primaryPurple"
        href={pathname + `/${customerId}`}
      >
        مشاهده سفارشات
      </Link>
    </>
  )
}

export default OrdersCellAction
