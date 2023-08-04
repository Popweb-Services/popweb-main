import { Balancer } from "react-wrap-balancer"

interface ProblemSolutionSectionProps {}

const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({}) => {
  return (
    <>
      <section className="w-full">
        <div
          dir="rtl"
          className="container py-[50px] mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-x-8 border-x-2 border-dashed"
        >
          <div className="flex flex-col gap-y-4 ">
            <p className="font-semibold text-primaryPurple">فروشگاهی آسان</p>
            <h2 className="text-3xl font-bold text-primarySlate">
              <Balancer>با مشکلات فروشگاه آنلاین خداحافظی کنید</Balancer>
            </h2>

            <div className="space-y-4">
              <p className="text-xl font-medium text-text">
                <Balancer>
                  راه اندازی فروشگاه آنلاین می تواند به رشد کسب و کار شما در
                  اینترنت کمک کند اما این کار مشکلات و چالش های زیادی را در پی
                  دارد
                </Balancer>
              </p>
              <p className="text-md  text-text">
                <Balancer>
                  از جمله چالش هایی که کسب و کار ها هنگام راه اندازی فروشگاه
                  آنلاین با آن مواجه اند می توان به پیدا کردن طراح متخصص ، هزینه
                  بالا ، زمان بر بودن پروسه طراحی و نیاز به دانش فنی اشاره کرد.
                </Balancer>
              </p>
            </div>
          </div>
          <div className="flex flex-col pt-20">
            <p className="text-lg text-text">
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
