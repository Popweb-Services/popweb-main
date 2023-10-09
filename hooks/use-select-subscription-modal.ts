import { create } from "zustand"

interface SelectSubscriptionModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useSelectSubscriptionModal = create<SelectSubscriptionModalStore>(
  (set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  })
)

export default useSelectSubscriptionModal
