import { CopyButton } from "@/components/templates/copy-button";
import type { Template } from "@/types";

export function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {template.category}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{template.title}</h3>
        </div>
        <CopyButton
          text={template.content}
          templateTitle={template.title}
          templateCategory={template.category}
        />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        When to use it: {template.use_case}
      </p>
      <p className="mt-4 rounded-xl bg-muted p-4 text-sm leading-6">
        {template.content}
      </p>
    </article>
  );
}
