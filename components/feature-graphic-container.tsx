import { ReactNode } from "react"

import GradientBackground from "./ui/gradient-background"

interface FeatureGraphicContainerProps {
  children: ReactNode
}

const FeatureGraphicContainer: React.FC<FeatureGraphicContainerProps> = ({
  children,
}) => {
  return (
    <>
      <div className="relative w-full h-full select-none">
        <GradientBackground />
        {children}
      </div>
    </>
  )
}

export default FeatureGraphicContainer
