import { create } from "zustand"

interface ArchiveAlertModalStore {
  categoryId: string | undefined
  isOpen: boolean
  onOpen: (categoryId: string) => void
  onClose: () => void
}
const useCategoryArchiveAlertModal = create<ArchiveAlertModalStore>((set) => ({
  categoryId: undefined,
  isOpen: false,
  onOpen: (categoryId) => set({ isOpen: true, categoryId }),
  onClose: () => set({ isOpen: false }),
}))

export default useCategoryArchiveAlertModal
