import { create } from "zustand"

interface CreateStoreModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
const useCreateStoreModal = create<CreateStoreModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useCreateStoreModal
