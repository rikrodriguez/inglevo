import { TemplateCategoryFilter } from "@/components/templates/template-category-filter";
import type { Template } from "@/types";

export function Templates({ templates }: { templates: Template[] }) {
  return <TemplateCategoryFilter templates={templates} />;
}
