import { getServerSession } from "next-auth"

import { authOptions } from "./auth"

export const getAuthSession = async () => await getServerSession(authOptions)
