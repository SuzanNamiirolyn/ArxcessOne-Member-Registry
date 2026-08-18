import * as React from "react"
import { useFormContext, Controller, type ControllerProps, type FieldPath, type FieldValues, FormProvider, type UseFormReturn, type ControllerRenderProps, type ControllerFieldState } from "react-hook-form"

import { cn } from "@/lib/utils"

function Form<TFieldValues extends FieldValues = FieldValues>({
  children,
  ...form
}: { children: React.ReactNode } & UseFormReturn<TFieldValues>) {
  return <FormProvider {...form}>{children}</FormProvider>
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-item"
      className={cn("space-y-2", className)}
      {...props}
    />
  )
}

function FormLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="form-label"
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<"div">) {
  return <div data-slot="form-control" {...props} />
}

type FormFieldRenderProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
}

function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  render,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  render: (props: FormFieldRenderProps<TFieldValues, TName>) => React.ReactElement
}) {
  const form = useFormContext<TFieldValues>()

  return (
    <Controller
      {...props}
      control={control ?? form.control}
      name={name}
      render={({ field, fieldState }) => render({ field, fieldState })}
    />
  )
}

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
}
