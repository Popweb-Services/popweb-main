import { create } from "zustand"

interface PaymentModalStore {
  isOpen: boolean
  mounths?: number
  setMounths: (mounths: number) => void
  onOpen: () => void
  onClose: () => void
}

const usePaymentModal = create<PaymentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setMounths: (mounths) => set({ mounths: mounths }),
}))

export default usePaymentModal
