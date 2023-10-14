import axios from "axios"

interface VerifyTransactionPageProps {
  searchParams: {
    [key: string]: string
  }
}

const VerifyTransactionPage: React.FC<VerifyTransactionPageProps> = async ({
  searchParams,
}) => {
  console.log(searchParams)
  console.log(searchParams.token)
  console.log(searchParams.payment_status)
  if (searchParams.payment_status === "OK" && searchParams.token.length > 0) {
    try {
      const { data } = await axios.post("https://ipg.vandar.io/api/v3/verify", {
        api_key: process.env.VANDAR_API_KEY,
        token: searchParams.token,
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return <></>
}

export default VerifyTransactionPage
