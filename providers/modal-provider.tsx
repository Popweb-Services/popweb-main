import CategoryArchiveAlertModal from "@/components/category-archive-alert-modal"
import CategoryDeleteAlertModal from "@/components/category-delete-alert-modal"
import CreateStoreModal from "@/components/create-store-modal"

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  return (
    <>
      <CreateStoreModal />
      <CategoryDeleteAlertModal />
      <CategoryArchiveAlertModal />
    </>
  )
}

export default ModalProvider
