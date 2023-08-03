import { LightningBoltIcon } from "@radix-ui/react-icons"
import { LuShoppingBag } from "react-icons/lu"
import { MdOutlineCodeOff } from "react-icons/md"
import { Balancer } from "react-wrap-balancer"

import { siteConfig } from "@/config/site"

import Icon from "./ui/icon"

interface BenefitsSectionProps {}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({}) => {
  return (
    <>
      <section className="w-full bg-primary">
        <div
          dir="rtl"
          className="container mx-auto grid grid-cols-1 gp-x-6 md:grid-cols-3 max-w-6xl py-[50px] border-x-2 border-dashed max-md:gap-y-4"
        >
          {siteConfig.benefits.map((benefit) => (
            <div key={benefit.title} className="flex flex-col gap-y-4">
              <Icon icon={benefit.icon} className="text-accent w-10 h-10" />
              <h2 className="text-white font-semibold">
                <Balancer>{benefit.title}</Balancer>
              </h2>
              <p className="text-neutral-400">
                <Balancer>{benefit.description}</Balancer>
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default BenefitsSection
