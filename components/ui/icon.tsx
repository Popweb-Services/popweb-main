import { IconType } from "react-icons/lib"

interface IconProps {
  icon: IconType
  className?: string
}

const Icon: React.FC<IconProps> = ({ icon: Icon, className }) => {
  return (
    <>
      <Icon className={className} />
    </>
  )
}

export default Icon
