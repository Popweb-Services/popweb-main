"use client"

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Toaster } from "@/components/ui/toaster"

import ModalProvider from "./modal-provider"

interface ProviderProps {
  children: ReactNode
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryClientProvider>
    </>
  )
}

export default Provider
