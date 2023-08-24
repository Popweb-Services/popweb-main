import { Badge } from "./badge"

interface OptionalBadgeProps {}

const OptionalBadge: React.FC<OptionalBadgeProps> = ({}) => {
  return (
    <>
      <Badge variant="outline" className="hover:bg-secondary bg-secondary">اختیاری</Badge>
    </>
  )
}

export default OptionalBadge
