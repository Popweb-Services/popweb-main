"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Store } from "@prisma/client"
import { CommandEmpty } from "cmdk"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import { PiStorefront } from "react-icons/pi"

import { cn } from "@/lib/utils"
import useCreateStoreModal from "@/hooks/use-create-store-modal"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "./ui/button"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  stores: Store[]
}

const StoreSwitcher: React.FC<StoreSwitcherProps> = ({
  className,
  stores = [],
}) => {
  const createStoreModal = useCreateStoreModal()
  const params = useParams()
  const router = useRouter()

  const formatedItems = stores.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const currentStore = formatedItems.find(
    (item) => item.value === params.storeId
  )

  const [open, setOpen] = useState<boolean>(false)

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false)
    router.push(`/dashboard/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger dir="rtl" asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-label="select a store"
          aria-expanded={open}
          className={cn("w-[200px] justify-between items-center", className)}
        >
          <PiStorefront className="ml-2" />
          {currentStore?.label ?? "فروشگاه جدید"}
          <ChevronsUpDown className="mr-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent dir="rtl" className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput className="px-3" placeholder="جستجو" />
            <CommandEmpty className="p-1 text-text">
              فروشگاهی یافت نشد
            </CommandEmpty>
            <CommandGroup heading="فروشگاه های من">
              {formatedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm cursor-pointer"
                >
                  <PiStorefront className="ml-2" />
                  {store.label}
                  <Check
                    className={cn(
                      "mr-auto h-4 w-4",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  createStoreModal.onOpen()
                }}
                className="cursor-pointer"
              >
                فروشگاه جدید
                <PlusCircle className="mr-2 h-5 w-5" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher
