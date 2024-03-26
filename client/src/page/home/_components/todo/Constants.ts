import { TRadioItem } from "@/components/form/FormRadioGroup";
import { TodoVariant } from "@/types/todo";

export const variantItems: TRadioItem[] = [
  { value: TodoVariant.todo, label: "Todo" },
  { value: TodoVariant.progress, label: "Progress" },
  { value: TodoVariant.planned, label: "Planned" },
  { value: TodoVariant.closed, label: "Closed" },
]
