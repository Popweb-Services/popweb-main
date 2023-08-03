import { Balancer } from "react-wrap-balancer"

import { siteConfig } from "@/config/site"

import CouponGraphic from "./coupon-graphic"
import FeatureCard from "./feature-card"
import PaymentFeatureGraphic from "./payment-feature-graphic"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import GradientBackground from "./ui/gradient-background"

interface FeaturesSectionProps {}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({}) => {
  return (
    <>
      <section className="bg-secondary border-b-2 border-dashed">
        <div
          dir="rtl"
          className="container mx-auto max-w-6xl py-[80px] border-x-2 border-dashed space-y-4"
        >
          <p className="text-lg font-semibold text-accent">امکانات پاپ وب</p>
          <h2 className="text-2xl font-bold">
            تمام قابلیت هایی که یک فروشگاه آنلاین نیاز دارد اینجاست
          </h2>
          <p>
            <Balancer>
              یک فروشگاه آنلاین برای افزایش فروش و مشتری نیاز به امکانات زیادی
              دارد ، فروشگاه ساز پاپ وب تمامی این امکانات را در اختیار شما خواهد
              گذاشت.
            </Balancer>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full h-full ">
              {/* TODO: this code should be written better */}
              <FeatureCard
                graphic={<PaymentFeatureGraphic />}
                title={siteConfig.features[0].title}
                description={siteConfig.features[0].description}
              />
            </div>
            <div className="w-full h-full md:first-letter md:pt-28">
              <FeatureCard
                graphic={<CouponGraphic />}
                title={siteConfig.features[1].title}
                description={siteConfig.features[1].description}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FeaturesSection
