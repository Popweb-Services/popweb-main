import Image from "next/image"

import FeatureGraphicContainer from "./feature-graphic-container"
import { Button } from "./ui/button"
import GradientBackground from "./ui/gradient-background"

interface PaymentFeatureGraphicProps {}

const paymentMethods = [
  {
    logo: "/images/snapppay-logo.jpg",
    label: "اسنپ پی",
  },
  {
    logo: "/images/saman-bank-logo.png",
    label: "درگاه بانک سامان",
  },
  {
    logo: "/images/mellat-bank-logo.png",
    label: "درگاه بانک ملت",
  },
  {
    logo: "/images/zarinpal-logo.png",
    label: "زرین پال",
  },
]

const PaymentFeatureGraphic: React.FC<PaymentFeatureGraphicProps> = ({}) => {
  return (
    <>
      <FeatureGraphicContainer>
        <figure
          dir="rtl"
          className="flex flex-col gap-y-2 rounded-bl-xl aspect-[1.5] lg:scale-100 md:scale-75 scale-95 origin-top-right max-w-[432px] p-4 pt-10 bg-[#FDFDFD] absolute -top-8 z-10 transition-transform duration-500 group-hover:translate-y-5"
        >
          <h2 className="font-semibold">پرداخت با :</h2>
          <hr />
          <div className="grid grid-cols-4 gap-4">
            {paymentMethods.map((paymentMethod) => (
              <div className="flex flex-col items-center pt-2 justify-center border rounded-lg space-y-2">
                <Image
                  src={paymentMethod.logo}
                  width={40}
                  height={40}
                  alt={paymentMethod.label}
                />
                <p className="text-xs text-center">{paymentMethod.label}</p>
              </div>
            ))}
          </div>
          <Button className="mt-3 rounded-lg disabled:opacity-100" disabled>
            پرداخت
          </Button>
        </figure>
      </FeatureGraphicContainer>
    </>
  )
}

export default PaymentFeatureGraphic
