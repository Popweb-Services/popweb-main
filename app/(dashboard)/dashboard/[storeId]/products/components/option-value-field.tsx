"use client"

import { Plus, Trash, Trash2 } from "lucide-react"
import {
  FieldArrayWithId,
  UseFormRegister,
  useFieldArray,
  type Control,
} from "react-hook-form"
import { z } from "zod"

import { createProductFormSchema } from "@/lib/validators/store-validators"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface OptionValueFieldProps {
  nestIndex: number
  control: Control<z.infer<typeof createProductFormSchema>>
  register: UseFormRegister<z.infer<typeof createProductFormSchema>>
  onChange: () => void
}

const OptionValueField: React.FC<OptionValueFieldProps> = ({
  onChange,
  nestIndex,
  control,
  register,
}) => {
  const { fields, remove, append } = useFieldArray({
    name: `options.${nestIndex}.values`,
    control: control,
  })
  return (
    <>
      <div>
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`options.${nestIndex}.values.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-semibold flex items-center justify-between">
                  مقدار گونه
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => {
                        remove(index)
                        onChange()
                      }}
                      variant="ghost"
                    >
                      <Trash2 size={20} />
                    </Button>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="مثال: سبز، بزرگ"
                    defaultValue={field.value}
                    onChange={(event) => {
                      field.onChange(event.target.value)
                      onChange()
                    }}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="text-primaryPurple flex mt-5 items-center gap-x-2 text-sm"
        >
          افزودن مقدار گونه
          <Plus size={15} />
        </button>
      </div>
    </>
  )
}

export default OptionValueField
