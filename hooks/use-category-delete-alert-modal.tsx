import { create } from "zustand"

interface DeleteAlertModalStore {
  categoryId: string | undefined
  isOpen: boolean
  onOpen: (categoryId: string) => void
  onClose: () => void
}
const useCategoryDeleteAlertModal = create<DeleteAlertModalStore>((set) => ({
  categoryId: undefined,
  isOpen: false,
  onOpen: (categoryId) => set({ isOpen: true, categoryId }),
  onClose: () => set({ isOpen: false }),
}))

export default useCategoryDeleteAlertModal
