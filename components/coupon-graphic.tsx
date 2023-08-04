import { BiSolidCoupon } from "react-icons/bi"

import FeatureGraphicContainer from "./feature-graphic-container"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"

interface CouponGraphicProps {}

const CouponGraphic: React.FC<CouponGraphicProps> = ({}) => {
  return (
    <>
      <FeatureGraphicContainer>
        <figure
          dir="rtl"
          className=" scale-90  md:scale-75 lg:scale-95 xl:scale-100 w-[90%]  p-4 z-10  bg-white absolute left-0 -top-5 rounded-br-xl select-none space-y-4 group-hover:translate-y-4 pt-10 transition-transform duration-500 origin-top-left"
        >
          <Separator />
          <div className="flex items-center gap-x-3">
            <BiSolidCoupon />
            <h2 className="text-lg">کد تخفیف</h2>
          </div>
          <div className="flex items-center justify-start gap-x-2">
            <Button variant="outline" className="disabled:opacity-100" disabled>
              اعمال
            </Button>
            <Input
              dir="ltr"
              value="POPWEBCOUPON"
              disabled
              className="disabled:opacity-100 disabled:cursor-default select-none"
            />
          </div>
          <Button className="w-full disabled:opacity-100 rounded-lg" disabled>
            تکمیل اطلاعات ارسال
          </Button>
        </figure>
      </FeatureGraphicContainer>
    </>
  )
}

export default CouponGraphic
