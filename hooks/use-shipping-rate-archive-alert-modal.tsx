import { create } from "zustand"

interface ArchiveAlertModalStore {
  shippingRateId: string | undefined
  isOpen: boolean
  onOpen: (shippingRateId: string) => void
  onClose: () => void
}
const useShippingRateArchiveAlertModal = create<ArchiveAlertModalStore>((set) => ({
  shippingRateId: undefined,
  isOpen: false,
  onOpen: (shippingRateId) => set({ isOpen: true, shippingRateId }),
  onClose: () => set({ isOpen: false }),
}))

export default useShippingRateArchiveAlertModal
