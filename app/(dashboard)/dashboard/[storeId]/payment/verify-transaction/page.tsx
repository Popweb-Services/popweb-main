import VerifyTransactionClient from "./verify-transaction-client"

interface VerifyTransactionPageProps {
  params: {
    storeId: string
  }
}

const VerifyTransactionPage: React.FC<VerifyTransactionPageProps> = ({
  params,
}) => {
  return (
    <>
      <VerifyTransactionClient storeId={params.storeId} />
    </>
  )
}

export default VerifyTransactionPage
