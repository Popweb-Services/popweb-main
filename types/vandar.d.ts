export type TransactionInfoResponse = {
  status: number
  amount: string
  transId: number
  refnumber: string
  trackingCode: string
  factorNumber: string
  description: string
  cardNumber: string
  CID: string
  createdAt: string
  paymentDate: string
  code: number
  message: string
}

export type VerifyTransactionResponse = {
  status: number
  amount: string
  realAmount: string
  wage: string
  transId: string
  factorNumber: string
  mobile: string
  description: string
  cardNumber: string
  paymentDate: string
  cid: string
  message: string
}
