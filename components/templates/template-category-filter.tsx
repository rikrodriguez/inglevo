"use client";

import { useMemo, useState } from "react";

import { TemplateCard } from "@/components/templates/template-card";
import type { Template } from "@/types";

export function TemplateCategoryFilter({ templates }: { templates: Template[] }) {
  const categories = useMemo(
    () => ["Todos", ...Array.from(new Set(templates.map((template) => template.category)))],
    [templates]
  );
  const [active, setActive] = useState("Todos");
  const filtered =
    active === "Todos"
      ? templates
      : templates.filter((template) => template.category === active);

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              active === category
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-white hover:bg-muted"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.length ? (
          filtered.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-white p-6 text-sm text-muted-foreground">
            There are no templates in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
