import { Balancer } from "react-wrap-balancer"

interface ProblemSolutionSectionProps {}

const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({}) => {
  return (
    <>
      <section className="w-full">
        <div
          dir="rtl"
          className="container py-[50px] mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 border-x-2 border-dashed"
        >
          <div className="flex flex-col gap-y-4 ">
            <p className="font-semibold text-accent">فروشگاهی آسان</p>
            <h2 className="text-3xl font-bold">
              <Balancer>با مشکلات فروشگاه آنلاین خداحافظی کنید</Balancer>
            </h2>

            <div className="space-y-4">
              <p className="text-xl font-medium">
                <Balancer>
                  راه اندازی یک فروشگاه آنلاین برای کسب و کارتان می تواند مفید
                  باشد اما این کار می تواند مشکلات و چالش های زیادی را در پی
                  داشته باشد.
                </Balancer>
              </p>
              <p className="text-md text-neutral-500">
                <Balancer>
                  از جمله چالش هایی که کسب و کار ها هنگام راه اندازی فروشگاه
                  آنلاین با آن مواجه اند می توان به پیدا کردن طراح متخصص ، هزینه
                  بالا زمان بر بودن پروسه طراحی و نیاز به دانش فنی اشاره کرد.
                </Balancer>
              </p>
            </div>
          </div>
          <div className="flex flex-col pt-20">
            <p className="text-lg">
              <Balancer>
                فروشگاه ساز پاپ وب این امکان را برای شما فراهم می کند تا تنها با
                چند کلیک و در سریع ترین زمان ممکن فروشگاه آنلاین خود را به صورت
                رایگان راه اندازی کنید و از امکانات آن بهره مند شوید.
              </Balancer>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProblemSolutionSection
