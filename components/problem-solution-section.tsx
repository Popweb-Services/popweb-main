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
            <Balancer>
              <div className="space-y-4">
                <p className="text-xl font-medium">
                  راه اندازی یک فروشگاه آنلاین برای کسب و کارتان می تواند مفید
                  باشد اما این کار می تواند مشکلات و چالش های زیادی را در پی
                  داشته باشد.
                </p>
                <p className="text-md text-neutral-500">
                  از جمله چالش هایی که کسب و کار ها هنگام راه اندازی فروشگاه
                  آنلاین با آن مواجه اند می توان به پیدا کردن طراح متخصص ، هزینه
                  بالا زمان بر بودن پروسه طراحی و نیاز به دانش فنی اشاره کرد.
                </p>
              </div>
            </Balancer>
          </div>
          <div className="flex flex-col pt-20">
            <Balancer>
              <p className="text-lg"></p>
            </Balancer>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProblemSolutionSection
