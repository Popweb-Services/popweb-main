interface GradientBackgroundProps {}

const GradientBackground: React.FC<GradientBackgroundProps> = ({}) => {
  return (
    <>
      <div className="w-full h-full bg-secondary relative opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute right-1/2 top-1/3  origin-center animate-[spin_20s_ease-in-out_infinite]">
          <div className="bg-[#11efe3] aspect-square w-[350px] rounded-full opacity-50  blur-3xl absolute right-1/2" />
          <div className="bg-[#96f] w-[350px]  aspect-square rounded-full opacity-50  blur-3xl absolute left-1/2" />
        </div>
      </div>
    </>
  )
}

export default GradientBackground
