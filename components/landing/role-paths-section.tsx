import { rolePaths } from "@/data/role-paths";

const toolLogoLabels: Record<string, string> = {
  GoHighLevel: "GHL",
  HubSpot: "HS",
  Salesforce: "SF",
  Slack: "S",
  Zoom: "Z",
  "Google Workspace": "GW",
  Zendesk: "ZD",
  Intercom: "IC",
  "Help Scout": "HS",
  "Zoom / Meet": "ZM",
  GitHub: "GH",
  Jira: "JR",
  Linear: "LN",
  Notion: "N",
  "Google Meet": "GM",
  Asana: "A",
  Trello: "T",
  ClickUp: "CU",
  Monday: "M",
  Figma: "F",
  "Jira / Linear": "JL",
  Calendly: "C",
  "Meta Ads": "MA",
  "Google Analytics": "GA",
  Airtable: "AT",
  "Google Sheets": "GS",
  "Asana / ClickUp": "AC",
};

export function RolePathsSection() {
  return (
    <section id="role-paths" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="section-kicker">Role paths</p>
          <h2 className="brand-section-title mx-auto mt-4 max-w-4xl text-6xl sm:text-7xl">
            Train for the role you actually want.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-neutral-600">
            Inglevo trains the English, tools and task situations your target
            remote role actually requires.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {rolePaths.map((path) => (
            <article key={path.role} className="landing-card group min-h-[390px]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-black">{path.focus}</p>
                <span className={path.status === "active" ? "badge-ready" : "badge-pending"}>
                  {path.status === "active" ? "Active" : "Coming soon"}
                </span>
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                {path.role}
              </h3>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  English scenarios
                </p>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {path.roleEnglishScenarios.slice(0, 3).join(", ")}.
                </p>
              </div>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Tools practiced
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {path.roleTools.slice(0, 4).map((tool) => (
                    <span key={tool} className="inline-flex items-center gap-2 rounded-full bg-[#d0f5e3] px-2.5 py-1.5 text-xs font-medium text-black">
                      <span className="grid size-5 place-items-center rounded-full bg-white text-[9px] font-bold shadow-sm">
                        {toolLogoLabels[tool] ?? tool.slice(0, 2).toUpperCase()}
                      </span>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">
                Verifies: {path.verifies}
              </p>
              {path.status !== "active" ? (
                <p className="mt-4 rounded-2xl bg-[#dfdbd6]/55 px-4 py-3 text-xs font-medium text-black">
                  This role path is queued after Customer Service.
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
