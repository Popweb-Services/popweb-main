import CreateStoreModal from "@/components/create-store-modal"

interface ModalProviderProps {}

const ModalProvider: React.FC<ModalProviderProps> = ({}) => {
  return (
    <>
      <CreateStoreModal />
    </>
  )
}

export default ModalProvider
