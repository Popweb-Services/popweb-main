import { create } from "zustand"

interface DeleteAlertModalStore {
  shippingRateId: string | undefined
  isOpen: boolean
  onOpen: (shippingRateId: string) => void
  onClose: () => void
}
const useShippingRateDeleteAlertModal = create<DeleteAlertModalStore>(
  (set) => ({
    shippingRateId: undefined,
    isOpen: false,
    onOpen: (shippingRateId) => set({ isOpen: true, shippingRateId }),
    onClose: () => set({ isOpen: false }),
  })
)

export default useShippingRateDeleteAlertModal
