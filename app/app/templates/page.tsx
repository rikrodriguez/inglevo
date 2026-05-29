import { getTemplates } from "@/lib/data";
import { TemplateCategoryFilter } from "@/components/templates/template-category-filter";

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <div className="mx-auto grid max-w-6xl gap-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Remote Jobs Applications · Templates
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Remote Work & Job Application Templates
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Use these messages to communicate more clearly, professionally and
          reliably with recruiters, teams and international clients.
        </p>
      </div>
      <TemplateCategoryFilter templates={templates} />
    </div>
  );
}
