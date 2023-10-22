import { isAfter } from "date-fns"

import prismadb from "./prismadb"

const checkSubscriptionEnded = async (storeId: string) => {
  const store = await prismadb.store.findUnique({
    where: {
      id: storeId,
    },
  })
  if (isAfter(new Date(), store?.subscriptionEnd!)) {
    return true
  }
  return false
}

export default checkSubscriptionEnded
