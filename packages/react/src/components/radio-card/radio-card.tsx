"use client"

import type { Assign } from "@ark-ui/react"
import {
  RadioGroup as ArkRadioGroup,
  type UseRadioGroupContext,
  type UseRadioGroupItemContext,
  useRadioGroupItemContext,
} from "@ark-ui/react/radio-group"
import type { JSX } from "react"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"
import { dataAttr } from "../../utils"
import { Radiomark } from "../radiomark"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useRadioCardStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "radioCard" })

export { useRadioCardStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardRootProviderBaseProps
  extends Assign<
      ArkRadioGroup.RootProviderBaseProps,
      SlotRecipeProps<"radioCard">
    >,
    UnstyledProp {}

export interface RadioCardRootProviderProps
  extends HTMLChakraProps<"div", RadioCardRootProviderBaseProps> {}

export const RadioCardRootProvider = withProvider<
  HTMLDivElement,
  RadioCardRootProviderProps
>(ArkRadioGroup.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardRootBaseProps
  extends Assign<ArkRadioGroup.RootBaseProps, SlotRecipeProps<"radioCard">>,
    UnstyledProp {}

export interface RadioCardRootProps
  extends HTMLChakraProps<"div", RadioCardRootBaseProps> {}

export const RadioCardRoot = withProvider<HTMLDivElement, RadioCardRootProps>(
  ArkRadioGroup.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const RadioCardPropsProvider =
  PropsProvider as React.Provider<RadioCardRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardLabelProps
  extends HTMLChakraProps<"div", ArkRadioGroup.LabelBaseProps>,
    UnstyledProp {}

export const RadioCardLabel = withContext<HTMLDivElement, RadioCardLabelProps>(
  ArkRadioGroup.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemProps
  extends HTMLChakraProps<"div", ArkRadioGroup.ItemBaseProps>,
    UnstyledProp {}

export const RadioCardItem = withContext<HTMLDivElement, RadioCardItemProps>(
  ArkRadioGroup.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemTextProps
  extends HTMLChakraProps<"span", ArkRadioGroup.ItemTextBaseProps>,
    UnstyledProp {}

export const RadioCardItemText = withContext<
  HTMLSpanElement,
  RadioCardItemTextProps
>(ArkRadioGroup.ItemText, "itemText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemDescriptionProps
  extends HTMLChakraProps<"div">,
    UnstyledProp {}

export const RadioCardItemDescription = withContext<
  HTMLSpanElement,
  RadioCardItemDescriptionProps
>("div", "itemDescription", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemControlProps
  extends HTMLChakraProps<"div", ArkRadioGroup.ItemControlBaseProps> {}

export const RadioCardItemControl = forwardRef<
  HTMLDivElement,
  RadioCardItemControlProps
>(function RadioCardItemControl(props, ref) {
  const api = useRadioGroupItemContext()
  const styles = useRadioCardStyles()
  return (
    <chakra.div
      ref={ref}
      data-focus={dataAttr(api.focused)}
      data-disabled={dataAttr(api.disabled)}
      data-state={api.checked ? "checked" : "unchecked"}
      data-hover={dataAttr(api.hovered)}
      data-active={dataAttr(api.active)}
      data-invalid={dataAttr(api.invalid)}
      {...props}
      css={[styles["itemControl"], props.css]}
    />
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemContentProps
  extends HTMLChakraProps<"div">,
    UnstyledProp {}

export const RadioCardItemContent = withContext<
  HTMLDivElement,
  RadioCardItemContentProps
>("div", "itemContent")

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemAddonProps
  extends HTMLChakraProps<"div">,
    UnstyledProp {}

export const RadioCardItemAddon = withContext<
  HTMLElement,
  RadioCardItemAddonProps
>("div", "itemAddon")

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemIndicatorProps extends HTMLChakraProps<"span"> {
  checked?: React.ReactElement | undefined
}

export const RadioCardItemIndicator = forwardRef<
  HTMLSpanElement,
  RadioCardItemIndicatorProps
>(function RadioGroupItemIndicator(props, ref) {
  const { checked, ...rest } = props
  const styles = useRadioCardStyles()
  const itemContext = useRadioGroupItemContext()

  if (checked && itemContext.checked) {
    return (
      <chakra.span
        ref={ref}
        asChild
        {...rest}
        aria-hidden="true"
        css={[styles["itemIndicator"], props.css]}
      >
        {checked}
      </chakra.span>
    )
  }

  return (
    <Radiomark
      ref={ref}
      unstyled
      {...props}
      aria-hidden="true"
      checked={itemContext.checked}
      disabled={itemContext.disabled}
      css={[styles["itemIndicator"], props.css]}
    />
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardContextProps {
  children: (context: UseRadioGroupContext) => JSX.Element
}

export const RadioCardContext: React.FC<RadioCardContextProps> =
  ArkRadioGroup.Context

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemContextProps {
  children: (context: UseRadioGroupItemContext) => JSX.Element
}

export const RadioCardItemContext: React.FC<RadioCardItemContextProps> =
  ArkRadioGroup.ItemContext

////////////////////////////////////////////////////////////////////////////////////

export const RadioCardItemHiddenInput = ArkRadioGroup.ItemHiddenInput

export interface RadioCardValueChangeDetails
  extends ArkRadioGroup.ValueChangeDetails {}
