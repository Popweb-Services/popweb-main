interface FormHeadingProps {
  title: string
  description?: string
}

const FormHeading: React.FC<FormHeadingProps> = ({ title, description }) => {
  return (
    <>
      <div>
        <h3 className="text-primaryPurple text-lg font-semibold">{title}</h3>
        <p className="text-md text-text">{description}</p>
      </div>
    </>
  )
}

export default FormHeading
