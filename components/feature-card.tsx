import GradientBackground from "./ui/gradient-background"

interface FeatureCardProps {
  graphic: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  graphic,
  title,
  description,
}) => {
  return (
    <>
      <div dir="rtl" className="bg-white p-1 rounded-md group shadow-md">
        <div className="aspect-[1.5] relative w-full bg-[#F5F8FC] rounded-md overflow-hidden">
          <GradientBackground />
          {graphic}
        </div>
        <div className="p-[32px] flex flex-col gap-y-3">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </>
  )
}

export default FeatureCard
