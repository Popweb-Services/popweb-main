import { BiSolidCoupon } from "react-icons/bi"

import FeatureGraphicContainer from "./feature-graphic-container"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface CouponGraphicProps {}

const CouponGraphic: React.FC<CouponGraphicProps> = ({}) => {
  return (
    <>
      <FeatureGraphicContainer>
        <figure
          dir="rtl"
          className="w-[432px] p-4 z-10 lg:scale-100 md:scale-75 scale-95 bg-white absolute left-0 -top-5 rounded-br-xl select-none space-y-4 group-hover:translate-y-4 pt-10 transition-transform duration-500 origin-top-left"
        >
          <div className="flex items-center gap-x-3">
            <BiSolidCoupon />
            <h2 className="text-lg font-semibold">کد تخفیف</h2>
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
          <Button className="w-full disabled:opacity-100" disabled>تکمیل اطلاعات ارسال</Button>
        </figure>
      </FeatureGraphicContainer>
    </>
  )
}

export default CouponGraphic
