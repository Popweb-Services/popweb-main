import CategoryArchiveAlertModal from "@/components/modals/category-archive-alert-modal"
import CategoryDeleteAlertModal from "@/components/modals/category-delete-alert-modal"
import CreateStoreModal from "@/components/modals/create-store-modal"
import ShippingRateArchiveAlertModal from "@/components/modals/shipping-rate-archive-alert-modal"
import ShippingRateDeleteAlertModal from "@/components/modals/shipping-rate-delete-alert-modal"

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  return (
    <>
      <CreateStoreModal />
      <CategoryDeleteAlertModal />
      <CategoryArchiveAlertModal />
      <ShippingRateArchiveAlertModal />
      <ShippingRateDeleteAlertModal />
    </>
  )
}

export default ModalProvider
