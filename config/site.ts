import { LuCloudLightning, LuCode } from "react-icons/lu"
import { TbFreeRights } from "react-icons/tb"

import PaymentFeatureGraphic from "@/components/payment-feature-graphic"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Next.js",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    { label: "صفحه اصلی", href: "/" },
    { label: "تعرفه ها", href: "/pricing" },
    { label: "وبلاگ", href: "/blog" },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
  benefits: [
    {
      icon: LuCloudLightning,
      title: "سریع و آسان",
      description:
        "با فروشگاه ساز پاپ وب به راحتی و فقط با چند کلیک فروشگاه آنلاین خود را راه اندازی کنید.",
    },
    {
      icon: LuCode,
      title: "بدون نیاز به دانش فنی",
      description:
        "با فروشگاه ساز پاپ وب به راحتی و فقط با چند کلیک فروشگاه آنلاین خود را راه اندازی کنید.",
    },
    {
      icon: TbFreeRights,
      title: "شروع رایگان",
      description:
        "بدون پرداخت هیچ گونه هزینه ای فروشگاه آنلاین خود را راه اندازی کنید و از تمام امکانات استفاده کنید.",
    },
  ],
  features: [
    {
      graphic: PaymentFeatureGraphic,
      title: "اتصال به انواع درگاه های پرداخت",
      description:
        "شما می توانید فروشگاه خود را به انواع درگاه های بانکی مستقیم و غیر مستقیم و همچنین درگاه های پرداخت اقساطی مانند اسنپ پی متصل کنید.",
    },
  ],
  faq: [
    {
      question: "آیا برای سایت فروشگاهی ام باید جدا هاست تهیه کنم ؟",
      answer:
        "خیر، فروشگاه شما به صورت رایگان بر روی سرور های پاپ وب اجرا خواهد شد",
    },
    {
      question: "آیا سایت فروشگاهی ام از لحاظ سرعت و سئو بهینه سازی شده است ؟",
      answer:
        "بله، سایت فروشگاهی شما با استفاده از تکنولوژی های روز دنیا طراحی شده است تا از لحاظ سرعت و سئو بهترین نتیجه را در موتور های جستجو گر بگیرید",
    },
    {
      question: "آیا سایت فروشگاهی ام همان سایت وردپرسی است ؟",
      answer:
        "خیر ، تمامی امکانات سایت شما توسط پاپ برنامه نویسی شده است و سایت فروشگاهی شما وردپرسی نخواهد بود",
    },
    {
      question: "آیا برای استفاده از سایت فروشگاهی ام نیاز به دانش فنی دارم ؟",
      answer:
        "خیر ، برای استفاده از امکانات پاپ وب هیچ گونه نیازی به دانش فنی و برنامه نویسی نیست",
    },
    {
      question: "آیا برای راه اندازی سایت فروشگاهی باید اینماد داشته باشم ؟",
      answer:
        "خیر ، برای شروع به فروش از طریق سایت فروشگاهی نیازی به دریافت اینماد ندارید",
    },
  ],
}
