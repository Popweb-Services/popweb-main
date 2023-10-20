import { create } from "zustand"

interface SubscriptionEndedModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useSubscriptionModal = create<SubscriptionEndedModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useSubscriptionModal
