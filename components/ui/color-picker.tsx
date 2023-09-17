"use client"

import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react"
import { ColorResult, SketchPicker } from "react-color"

import { Input } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

interface ColorPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  handleChangeComplete: (color: string) => void
  defaultColor: string
}

const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ handleChangeComplete, defaultColor, ...props }, ref) => {
    const [color, setColor] = useState<string>(defaultColor)
    return (
      <>
        <Popover>
          <PopoverTrigger className="">
            <Input ref={ref} {...props} placeholder="انتخاب رنگ" />
          </PopoverTrigger>
          <PopoverContent className="p-0 m-0 border-0 shadow-none">
            <SketchPicker
              onChange={(color) => {
                handleChangeComplete(color.hex)
                setColor(color.hex)
              }}
              color={color}
              className="mx-auto"
            />
          </PopoverContent>
        </Popover>
      </>
    )
  }
)

ColorPicker.displayName = "ColorPicker"

export default ColorPicker
