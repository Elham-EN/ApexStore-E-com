import {
  createProductSchema,
  type CreateProductSchema,
} from "@/lib/schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function ProductForm(): React.ReactElement {
  const { register } = useForm<CreateProductSchema>({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
  });
  return <div>ProductForm</div>;
}
