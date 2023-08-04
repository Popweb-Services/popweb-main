import Image from "next/image"

import { AspectRatio } from "./ui/aspect-ratio"

interface PaymentFeatureGraphicProps {}

const PaymentFeatureGraphic: React.FC<PaymentFeatureGraphicProps> = ({}) => {
  return (
    <>
      <div className="w-[90%] absolute z-10 -top-3 group-hover:translate-y-3 transition-transform duration-500 right-0">
        <AspectRatio ratio={2 / 1}>
          <Image
            alt="payment graphic"
            fill
            src="/images/payment-graphic.png"
            className="object-cover rounded-bl-lg"
          />
        </AspectRatio>
      </div>
    </>
  )
}

export default PaymentFeatureGraphic
