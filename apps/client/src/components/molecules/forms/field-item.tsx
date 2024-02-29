"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import FormFieldItemProps from "../interfaces/types/FormFieldItemProps";

export default function FormFieldItem<T>({
  placeholder,
  label,
  form,
  name,
  isLoading,
}: FormFieldItemProps<T>): React.ReactElement {
  return (
    <FormField
      name={name}
      // @ts-expect-error types error
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>{label || "Your label"}</FormLabel>
            <FormMessage className="text-[0.8rem]" />
          </div>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder || "Your placeholder"}
              disabled={isLoading}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}