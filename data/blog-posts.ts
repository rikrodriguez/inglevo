import { roleBlogPosts } from "@/data/role-blog-posts";

export type BlogPostSection = {
  heading: string;
  body: string[];
  bullets?: string[];
  sample?: {
    label: string;
    items: string[];
  };
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  cluster: string;
  intent: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  excerpt: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  cta: {
    label: string;
    href: string;
  };
  sections: BlogPostSection[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedSlugs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "remote-job-interview-questions-english",
    title: "Remote Job Interview Questions in English: 25 Answers for LATAM Talent",
    description:
      "Prepare for remote job interviews in English with practical answers for communication, productivity, tools, home setup and salary conversations.",
    category: "Interview English",
    cluster: "Remote interviews",
    intent: "Prepare for a remote job interview in English",
    primaryKeyword: "remote job interview questions in English",
    secondaryKeywords: [
      "remote interview answers",
      "work from home interview questions",
      "English interview practice",
    ],
    excerpt:
      "A practical question bank for LATAM candidates applying to remote roles with US and global companies.",
    readTime: "12 min read",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    cta: {
      label: "Practice interviews with Inglevo",
      href: "/ai-english-trainer",
    },
    sections: [
      {
        heading: "What remote interviewers are really testing",
        body: [
          "A remote interview is not only a language test. Hiring teams are listening for clarity, ownership, async communication, tool confidence and whether you can work without constant supervision.",
          "For LATAM candidates, the best answers are usually simple, structured and specific. You do not need perfect English. You need answers that show how you think, how you communicate and how you handle real work situations.",
        ],
        bullets: [
          "Can you explain your work clearly in English?",
          "Can you communicate blockers before they become problems?",
          "Can you work across time zones without losing momentum?",
          "Can you use the tools the team already uses?",
          "Can you sound calm, professional and specific under pressure?",
        ],
      },
      {
        heading: "25 high-value remote interview questions",
        body: [
          "Use these questions as your practice list. Do not memorize long answers. Build a short answer with context, action and result.",
        ],
        bullets: [
          "Tell me about yourself.",
          "Why do you want to work remotely?",
          "How do you stay productive from home?",
          "How do you communicate when you are blocked?",
          "What tools do you use for remote work?",
          "How do you manage priorities when several tasks are urgent?",
          "How do you handle feedback in English?",
          "Describe a time you solved a problem without much supervision.",
          "How do you keep your team updated?",
          "What does good async communication mean to you?",
          "How do you manage meetings across time zones?",
          "How do you document your work?",
          "What is your home office setup?",
          "How do you avoid distractions?",
          "How do you build trust with a remote manager?",
          "Describe a time you disagreed with a teammate.",
          "How do you ask for clarification?",
          "How do you explain technical or complex topics to non-technical people?",
          "What is your English level?",
          "How do you keep improving your English?",
          "What salary range are you looking for?",
          "Why are you interested in this company?",
          "What makes you a strong fit for this role?",
          "What are your availability and time zone?",
          "Do you have any questions for us?",
        ],
      },
      {
        heading: "Answer framework: context, signal, proof",
        body: [
          "Strong answers usually follow a simple structure. First, give context. Then show the signal the employer wants. Finally, give proof with a real situation.",
          "This structure keeps your answer short and helps you avoid translating a long Spanish answer word by word.",
        ],
        sample: {
          label: "Sample answer",
          items: [
            "Question: How do you communicate when you are blocked?",
            "Answer: If I am blocked, I first check the documentation or previous tickets. If I cannot solve it quickly, I send a clear message with what I tried, what I need and the impact on the timeline. For instance, in my last role I was blocked by missing access to a reporting tool, so I documented the issue, tagged the owner and proposed a temporary manual report so the team could keep moving.",
          ],
        },
      },
      {
        heading: "Questions you should ask the company",
        body: [
          "The final part of the interview is a chance to sound like a serious remote candidate. Ask about communication, expectations and success metrics instead of only asking about schedule.",
        ],
        bullets: [
          "How does the team define success in the first 90 days?",
          "What communication channels does the team use for urgent and non-urgent work?",
          "How are priorities documented?",
          "What does a strong remote teammate do differently on this team?",
          "How does feedback usually happen?",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need perfect English for a remote job interview?",
        answer:
          "No. You need professional clarity. A candidate with B2 English and structured answers can often sound stronger than a fluent candidate who answers vaguely.",
      },
      {
        question: "Should I memorize interview answers?",
        answer:
          "Memorize frameworks, not scripts. A rigid script sounds artificial. Practice flexible answers using context, action and result.",
      },
      {
        question: "What is the most important remote interview skill?",
        answer:
          "Clear communication. Employers want to know that you can update, ask, clarify and document without creating confusion.",
      },
    ],
    relatedSlugs: [
      "tell-me-about-yourself-english-remote-job",
      "why-do-you-want-to-work-remotely-answer",
      "slack-update-examples-english",
    ],
  },
  {
    slug: "tell-me-about-yourself-english-remote-job",
    title: "Tell Me About Yourself in English for a Remote Job",
    description:
      "Learn how to answer tell me about yourself in English for remote jobs with a clear structure, examples and role-specific variations.",
    category: "Interview English",
    cluster: "Remote interviews",
    intent: "Answer the first interview question better",
    primaryKeyword: "tell me about yourself in English",
    secondaryKeywords: [
      "tell me about yourself remote job",
      "English interview answer",
      "remote job introduction",
    ],
    excerpt:
      "A practical formula for the question that opens many remote interviews and sets the tone for the rest of the call.",
    readTime: "8 min read",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    cta: {
      label: "Train your interview intro",
      href: "/ai-english-trainer",
    },
    sections: [
      {
        heading: "Why this question matters",
        body: [
          "Tell me about yourself is not a request for your life story. In a remote job interview, it is your chance to connect your experience, English communication and role fit in less than two minutes.",
          "The strongest answer sounds organized. It tells the interviewer what you do, what kind of work you have done, what tools or results matter and why the role makes sense now.",
        ],
      },
      {
        heading: "The 4-part structure",
        body: [
          "Use a short structure so your answer does not become too long. This is especially useful if English is not your first language.",
        ],
        bullets: [
          "Current profile: your role and strongest area.",
          "Relevant experience: what you have done that connects to the job.",
          "Remote signal: tools, communication, ownership or async work.",
          "Why now: why this role or company is the next logical step.",
        ],
      },
      {
        heading: "General answer template",
        body: [
          "Use this as a base, then make it specific to the job description.",
        ],
        sample: {
          label: "Template",
          items: [
            "I am a [role] with [X years] of experience in [area]. Most of my work has focused on [specific responsibility or result]. I have used tools like [tools] and I am comfortable communicating with teams through [Slack, email, tickets, CRM, docs]. I am now looking for a remote role where I can use my experience in [role area] and keep improving my professional English while contributing to a team with clear goals.",
          ],
        },
      },
      {
        heading: "Role-specific situations",
        body: [
          "The best answer changes by role. A customer support candidate should sound service-oriented. A developer should show problem solving. A sales candidate should show pipeline discipline and communication.",
        ],
        sample: {
          label: "Examples",
          items: [
            "Customer Support: I am a customer support specialist with experience helping users through chat and email. I am comfortable explaining steps clearly, documenting issues and escalating when needed. In my last role, I worked with tickets, macros and internal notes, so I understand how important clear written English is for remote teams.",
            "Software Developer: I am a frontend developer focused on React and product interfaces. I have worked with designers, product managers and backend teams, so I am used to explaining technical tradeoffs in simple English. I am looking for a remote role where I can build reliable user experiences and communicate clearly across async channels.",
            "SDR: I am an SDR with experience prospecting, writing outreach messages and booking meetings. I am comfortable using CRM tools, following up professionally and communicating with prospects in English. I want a remote sales role where I can combine consistency, research and strong written communication.",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "How long should my answer be?",
        answer:
          "Aim for 60 to 90 seconds. If the interviewer wants more detail, they will ask a follow-up question.",
      },
      {
        question: "Should I mention my English level?",
        answer:
          "Only if it helps. It is usually better to demonstrate your English by answering clearly than to spend too much time labeling your level.",
      },
      {
        question: "Can I use the same answer for every interview?",
        answer:
          "Use the same structure, but customize the details for each role and company.",
      },
    ],
    relatedSlugs: [
      "remote-job-interview-questions-english",
      "english-level-remote-jobs-b2-c1",
      "why-do-you-want-to-work-remotely-answer",
    ],
  },
  {
    slug: "remote-job-resume-ats-keywords",
    title: "How to Write a Remote Job Resume: ATS Keywords for LATAM Talent",
    description:
      "Build a remote job resume with ATS-friendly keywords, stronger bullet points and proof of communication, ownership and tool readiness.",
    category: "CV and Applications",
    cluster: "Remote applications",
    intent: "Improve a resume for remote roles",
    primaryKeyword: "remote job resume",
    secondaryKeywords: [
      "ATS keywords remote work",
      "CV for remote jobs",
      "remote resume examples",
    ],
    excerpt:
      "A remote CV should prove more than tasks. It should show tools, outcomes, communication and trust signals.",
    readTime: "10 min read",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    cta: {
      label: "Build a stronger remote CV",
      href: "/cv-builder",
    },
    sections: [
      {
        heading: "What makes a remote resume different",
        body: [
          "A remote resume must make trust visible. Hiring teams cannot observe you in an office, so your CV should show ownership, communication, documentation, tools and measurable outcomes.",
          "Many LATAM candidates under-sell themselves because their CV lists responsibilities instead of proof. A stronger resume turns tasks into business signals.",
        ],
      },
      {
        heading: "ATS keywords to include naturally",
        body: [
          "Applicant tracking systems scan for role, skill and tool matches. Do not stuff keywords. Use them where they honestly describe your work.",
        ],
        bullets: [
          "Remote collaboration",
          "Async communication",
          "Cross-functional communication",
          "Customer support",
          "Project management",
          "CRM",
          "Slack",
          "Notion",
          "Google Workspace",
          "Jira",
          "HubSpot",
          "Zendesk",
          "Documentation",
          "Stakeholder communication",
          "Time zone coordination",
          "Process improvement",
        ],
      },
      {
        heading: "Bullet formula for remote roles",
        body: [
          "A strong bullet connects action, tool and result. If you only write what you were responsible for, the recruiter has to guess your impact.",
        ],
        sample: {
          label: "Before and after",
          items: [
            "Weak: Responsible for answering customer emails.",
            "Stronger: Resolved 40+ customer emails per day in Zendesk, using clear written English, macros and internal notes to reduce repeat questions.",
            "Weak: Worked with the sales team.",
            "Stronger: Coordinated weekly pipeline updates with sales and operations through HubSpot and Slack, improving follow-up visibility across the team.",
          ],
        },
      },
      {
        heading: "Remote proof section",
        body: [
          "If your experience is not fully remote, you can still include remote-readiness proof. Add a short section for tools, communication and setup.",
        ],
        bullets: [
          "Professional English communication: interviews, async updates, customer messages.",
          "Remote tools: Slack, Zoom, Google Workspace, Notion, Jira or CRM tools.",
          "Setup: stable internet, quiet workspace, backup plan.",
          "Verification: link to a current Inglevo profile when available.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I write my CV in English?",
        answer:
          "Yes, if you are applying to US or global remote roles. Your CV is also a sample of your professional English.",
      },
      {
        question: "How many pages should a remote resume have?",
        answer:
          "One page is usually best for early and mid-level candidates. Two pages can work if you have deeper experience and every section adds value.",
      },
      {
        question: "Should I include a photo?",
        answer:
          "For US-style resumes, avoid photos unless the company or country specifically expects one.",
      },
    ],
    relatedSlugs: [
      "best-remote-jobs-latam-english-level-2026",
      "slack-update-examples-english",
      "remote-job-scams-red-flags-latam",
    ],
  },
  {
    slug: "slack-update-examples-english",
    title: "Slack Update Examples in English for Remote Teams",
    description:
      "Write clearer Slack updates in English with templates for progress, blockers, handoffs, priorities and async follow-ups.",
    category: "Async Writing",
    cluster: "Remote communication",
    intent: "Write better async updates in English",
    primaryKeyword: "Slack update examples",
    secondaryKeywords: [
      "async communication examples",
      "remote work English",
      "professional English messages",
    ],
    excerpt:
      "Remote teams judge reliability through written updates. These examples help you sound clear, calm and useful.",
    readTime: "9 min read",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    cta: {
      label: "Use remote work templates",
      href: "/templates",
    },
    sections: [
      {
        heading: "Why Slack English matters",
        body: [
          "In remote teams, your written messages often become your professional reputation. A clear update can make you look organized. A vague update can make managers worry, even if you are working hard.",
          "The goal is not to sound fancy. The goal is to make the next action obvious.",
        ],
      },
      {
        heading: "Progress update template",
        body: [
          "Use this when you want to show what is moving, what changed and what happens next.",
        ],
        sample: {
          label: "Template and sample",
          items: [
            "Template: Quick update: [what is done]. I am now working on [next step]. Expected by [time/date].",
            "Sample: Quick update: the customer import file is cleaned and uploaded. I am now checking the duplicate records before sending the final report. Expected by 3 PM Lima time.",
          ],
        },
      },
      {
        heading: "Blocker update template",
        body: [
          "A good blocker message includes what you tried, what is blocking you and what you need. Do not simply write I have a problem.",
        ],
        sample: {
          label: "Blocker sample",
          items: [
            "I am blocked on the billing report because I do not have access to the Stripe export. I already checked the shared drive and last week's report. Could someone with admin access export transactions from May 1 to May 31? I can continue with reconciliation once I have that file.",
          ],
        },
      },
      {
        heading: "Useful remote message patterns",
        body: [
          "Save these patterns and adapt them to your role.",
        ],
        bullets: [
          "Clarification: To make sure I understand, should I prioritize A before B?",
          "Handoff: I finished X and left notes in Y. The only open item is Z.",
          "Delay: This is taking longer than expected because of X. New ETA is Y.",
          "Decision needed: I see two options. Option A is faster, option B is more complete. My recommendation is A because of X.",
          "Follow-up: Just following up on this. Is this still the right priority for today?",
        ],
      },
    ],
    faqs: [
      {
        question: "Should Slack messages be formal?",
        answer:
          "They should be professional and clear, not overly formal. Short, specific messages usually work best.",
      },
      {
        question: "What should I do if I do not understand a task?",
        answer:
          "Ask a clarification question with your current understanding. This shows initiative instead of confusion.",
      },
      {
        question: "How often should I update my manager?",
        answer:
          "Follow the team's rhythm, but in remote work it is better to send a clear short update before someone has to ask.",
      },
    ],
    relatedSlugs: [
      "remote-job-interview-questions-english",
      "remote-job-resume-ats-keywords",
      "customer-success-interview-questions-english",
    ],
  },
  {
    slug: "english-level-remote-jobs-b2-c1",
    title: "B2 vs C1 English for Remote Jobs: What Level Do You Actually Need?",
    description:
      "Understand what B2 and C1 English mean for remote jobs, which roles need each level and how to prove communication readiness.",
    category: "English Level",
    cluster: "Remote readiness",
    intent: "Understand English requirements for remote jobs",
    primaryKeyword: "English level for remote jobs",
    secondaryKeywords: [
      "B2 English remote jobs",
      "C1 English remote work",
      "English level LATAM jobs",
    ],
    excerpt:
      "Remote hiring teams care less about labels and more about whether you can communicate in real work situations.",
    readTime: "8 min read",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    cta: {
      label: "Check your role readiness",
      href: "/verification-profile",
    },
    sections: [
      {
        heading: "The short answer",
        body: [
          "Many remote jobs can work with strong B2 English if the role is execution-focused and your communication is clear. C1 becomes more important when the role requires persuasion, leadership, client communication, strategy or complex writing.",
          "The mistake is thinking the label is enough. A candidate who says C1 but gives unclear answers can lose to a B2 candidate who communicates with structure and proof.",
        ],
      },
      {
        heading: "Roles where B2 can be enough",
        body: [
          "B2 English can be competitive when the role has clear processes and the candidate can ask questions, document work and understand feedback.",
        ],
        bullets: [
          "Customer support with scripts and macros",
          "Virtual assistant roles with clear workflows",
          "QA testing and bug reporting",
          "Junior operations roles",
          "Some technical roles with strong portfolio proof",
        ],
      },
      {
        heading: "Roles that often need C1",
        body: [
          "C1 matters when the role depends on nuance, influence, client-facing communication or fast decision-making in English.",
        ],
        bullets: [
          "Account management",
          "Customer success",
          "Sales and SDR roles",
          "Project management",
          "Product management",
          "Senior engineering with cross-functional leadership",
          "Marketing and content roles",
        ],
      },
      {
        heading: "How to prove your level",
        body: [
          "Do not rely only on a certificate label. Show practical signals that connect your English to the job.",
        ],
        bullets: [
          "Record or practice role-specific interview answers.",
          "Prepare written samples: Slack updates, support replies, follow-up emails.",
          "Use a verified profile that shows current practice and remote-readiness signals.",
          "Add role-specific English examples to your application assets.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I get a remote job with B2 English?",
        answer:
          "Yes, especially if your role has clear tasks and your answers are structured. You still need to show professional communication.",
      },
      {
        question: "Is C1 required for US remote jobs?",
        answer:
          "Not always. C1 is valuable for client-facing, leadership and communication-heavy roles, but some roles care more about execution and clear updates.",
      },
      {
        question: "How can I improve from B2 to job-ready English?",
        answer:
          "Practice role scenarios, interviews, async writing and explanations of your actual work. Generic grammar drills are not enough.",
      },
    ],
    relatedSlugs: [
      "best-remote-jobs-latam-english-level-2026",
      "tell-me-about-yourself-english-remote-job",
      "customer-success-interview-questions-english",
    ],
  },
  {
    slug: "why-do-you-want-to-work-remotely-answer",
    title: "How to Answer 'Why Do You Want to Work Remotely?'",
    description:
      "Answer why you want to work remotely without sounding generic, risky or only focused on personal convenience.",
    category: "Interview English",
    cluster: "Remote interviews",
    intent: "Answer a common remote interview question",
    primaryKeyword: "why do you want to work remotely answer",
    secondaryKeywords: [
      "remote work interview answer",
      "work from home interview question",
      "remote job English answer",
    ],
    excerpt:
      "The best answer connects remote work to focus, communication, outcomes and fit, not only comfort.",
    readTime: "7 min read",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    cta: {
      label: "Practice this answer",
      href: "/ai-english-trainer",
    },
    sections: [
      {
        heading: "What not to say",
        body: [
          "Many candidates answer this question with personal convenience: no commute, more comfort or more time at home. Those reasons may be true, but they do not prove you will be a strong remote teammate.",
          "The interviewer is really asking whether remote work will make you productive, reliable and easy to work with.",
        ],
        bullets: [
          "Avoid: I want more free time.",
          "Avoid: I do not like offices.",
          "Avoid: I want to work whenever I want.",
          "Avoid: Remote work is easier.",
        ],
      },
      {
        heading: "A better answer structure",
        body: [
          "Connect remote work to business outcomes. Show that you understand the responsibility that comes with flexibility.",
        ],
        bullets: [
          "Start with productivity or focus.",
          "Mention communication discipline.",
          "Show respect for goals and deadlines.",
          "Add one real situation from your experience.",
        ],
      },
      {
        heading: "Strong sample answer",
        body: [
          "This answer is clear without sounding over-rehearsed.",
        ],
        sample: {
          label: "Sample answer",
          items: [
            "I want to work remotely because I do some of my best work when I can focus deeply and communicate intentionally. I understand that remote work requires trust, clear updates and strong ownership. In my last role, I managed tasks through Slack and shared docs, and I learned to send proactive updates when priorities changed. For me, remote work is not about working less. It is about working with more clarity and accountability.",
          ],
        },
      },
      {
        heading: "Short variations by role",
        body: [
          "Customize the answer so it sounds connected to the job.",
        ],
        sample: {
          label: "Variations",
          items: [
            "Customer support: Remote work lets me focus on written communication, ticket quality and fast follow-up without losing empathy.",
            "Sales: Remote work fits the way modern sales teams operate: CRM discipline, written follow-up, research and consistent outreach.",
            "Developer: Remote work supports deep technical focus, but it only works when communication, documentation and handoffs are clear.",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Should I mention work-life balance?",
        answer:
          "You can mention it briefly, but do not make it the main answer. Lead with productivity, communication and accountability.",
      },
      {
        question: "Is it bad to say I prefer remote work?",
        answer:
          "No. It becomes stronger when you explain why remote work helps you produce better outcomes.",
      },
      {
        question: "How long should this answer be?",
        answer:
          "Around 45 to 75 seconds is enough for most interviews.",
      },
    ],
    relatedSlugs: [
      "remote-job-interview-questions-english",
      "tell-me-about-yourself-english-remote-job",
      "slack-update-examples-english",
    ],
  },
  {
    slug: "remote-job-scams-red-flags-latam",
    title: "Remote Job Scams: Red Flags LATAM Candidates Should Know",
    description:
      "Learn how to spot fake remote jobs, suspicious recruiters, payment scams and unrealistic offers before you share documents or money.",
    category: "Job Search Safety",
    cluster: "Remote applications",
    intent: "Avoid fake remote jobs and scams",
    primaryKeyword: "remote job scams",
    secondaryKeywords: [
      "fake remote jobs",
      "remote job red flags",
      "LATAM remote job scams",
    ],
    excerpt:
      "Remote job demand is high, and scammers use that demand. Learn the warning signs before you apply.",
    readTime: "9 min read",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    cta: {
      label: "Organize safer applications",
      href: "/job-crm",
    },
    sections: [
      {
        heading: "Why remote candidates are targeted",
        body: [
          "Remote roles attract global applicants, which makes them attractive to scammers. They can post fake jobs, impersonate companies and pressure candidates through messaging apps.",
          "A serious remote job process should feel professional. It should include a real company domain, clear role information, normal interview steps and no request for money.",
        ],
      },
      {
        heading: "Major red flags",
        body: [
          "If one red flag appears, slow down. If several appear together, do not continue.",
        ],
        bullets: [
          "They ask you to pay for equipment, training, software or verification.",
          "The recruiter uses only a personal email, not a company domain.",
          "The salary is much higher than the role normally pays and the process is too easy.",
          "They ask for passport, bank or tax information before a real offer.",
          "They want to send you a check to buy equipment.",
          "They avoid video calls or cannot prove they work at the company.",
          "The job description is vague, copied or full of generic promises.",
          "They pressure you to decide immediately.",
        ],
      },
      {
        heading: "How to verify a remote opportunity",
        body: [
          "Use a simple verification checklist before sharing sensitive information.",
        ],
        bullets: [
          "Check the company website and careers page.",
          "Search the recruiter's name and company profile.",
          "Confirm that the email domain matches the real company domain.",
          "Look for the job on the company's official site or trusted job boards.",
          "Ask clear questions about the team, manager, role and interview process.",
          "Never pay to get hired.",
        ],
      },
      {
        heading: "Safe message to ask for confirmation",
        body: [
          "You can ask directly without sounding rude.",
        ],
        sample: {
          label: "Message",
          items: [
            "Thank you for reaching out. Before I continue, could you please share the official job posting, your company email and the next steps in the interview process? I like to verify remote opportunities carefully before sharing personal information.",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Is it normal for a remote job to ask for payment?",
        answer:
          "No. A legitimate employer should not ask you to pay to be hired, receive equipment or access training.",
      },
      {
        question: "Should I share my passport before an interview?",
        answer:
          "Do not share sensitive documents before a legitimate offer and clear identity verification process.",
      },
      {
        question: "Can fake recruiters use real company names?",
        answer:
          "Yes. Always verify the email domain, official posting and recruiter identity.",
      },
    ],
    relatedSlugs: [
      "remote-job-resume-ats-keywords",
      "best-remote-jobs-latam-english-level-2026",
      "remote-job-interview-questions-english",
    ],
  },
  {
    slug: "best-remote-jobs-latam-english-level-2026",
    title: "Best Remote Jobs for LATAM Talent in 2026 by English Level",
    description:
      "Explore remote job paths for LATAM professionals by English level, from B2 execution roles to C1 client-facing roles.",
    category: "Remote Careers",
    cluster: "Remote readiness",
    intent: "Choose a remote role path by English level",
    primaryKeyword: "remote jobs LATAM",
    secondaryKeywords: [
      "best remote jobs 2026",
      "bilingual remote jobs",
      "remote jobs by English level",
    ],
    excerpt:
      "The best remote role is not always the most popular one. It is the role where your English, tools and experience create a credible signal.",
    readTime: "11 min read",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    cta: {
      label: "Explore role paths",
      href: "/role-paths",
    },
    sections: [
      {
        heading: "How to choose a remote path",
        body: [
          "Remote work is competitive. LATAM talent should choose role paths where their English level, work experience and tool skills match what employers need.",
          "Instead of applying to every remote job, build a focused path. Your CV, interview practice and templates should all point to the same role family.",
        ],
      },
      {
        heading: "Good paths for strong B2 English",
        body: [
          "B2 candidates should focus on roles where clarity, process and reliability matter more than advanced persuasion.",
        ],
        bullets: [
          "Customer support specialist",
          "Virtual assistant",
          "QA tester",
          "Operations assistant",
          "Data entry or research coordinator",
          "Junior technical support",
        ],
      },
      {
        heading: "Good paths for C1 English",
        body: [
          "C1 candidates can compete for roles with more client communication, negotiation and ownership.",
        ],
        bullets: [
          "Customer success associate",
          "Account manager",
          "SDR or sales development representative",
          "Project coordinator",
          "Marketing coordinator",
          "Recruiting coordinator",
          "Product support specialist",
        ],
      },
      {
        heading: "What to build for each path",
        body: [
          "Each path needs a different proof package. Do not use the same application assets for every role.",
        ],
        sample: {
          label: "Proof packages",
          items: [
            "Customer support: support reply samples, ticket examples, empathy scripts and tool familiarity.",
            "SDR: outreach messages, follow-up scripts, CRM discipline and objection handling.",
            "Project coordination: status updates, prioritization examples, meeting notes and stakeholder communication.",
            "Technical support: troubleshooting explanation, bug reports, documentation and escalation examples.",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "What remote jobs are best for LATAM candidates?",
        answer:
          "Customer support, sales, operations, technical support, project coordination and marketing roles can be strong paths, depending on English level and tool skills.",
      },
      {
        question: "Should I apply to many different remote roles?",
        answer:
          "A focused role path usually works better. It helps your CV, interview answers and proof signals feel consistent.",
      },
      {
        question: "Can I work for a US company from LATAM?",
        answer:
          "Many companies hire across borders, but requirements vary by company, contract type, country and compliance needs.",
      },
    ],
    relatedSlugs: [
      "english-level-remote-jobs-b2-c1",
      "remote-job-resume-ats-keywords",
      "sdr-interview-questions-english",
    ],
  },
  {
    slug: "customer-success-interview-questions-english",
    title: "Customer Success Interview Questions in English for Remote Roles",
    description:
      "Prepare for customer success interviews in English with answers for retention, escalations, renewals, communication and remote collaboration.",
    category: "Role Interviews",
    cluster: "Remote interviews",
    intent: "Prepare for customer success interviews",
    primaryKeyword: "customer success interview questions",
    secondaryKeywords: [
      "customer success interview answers",
      "remote customer success interview",
      "customer success English",
    ],
    excerpt:
      "Customer success roles need English that can explain, calm, guide and influence customers across remote channels.",
    readTime: "10 min read",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    cta: {
      label: "Practice customer-facing English",
      href: "/ai-english-trainer",
    },
    sections: [
      {
        heading: "What customer success teams test",
        body: [
          "Customer success interviews test more than friendliness. They test whether you can understand customer goals, communicate value, handle risk and coordinate with internal teams.",
          "For remote roles, written communication is especially important because many customer issues happen through email, chat, CRM notes and internal handoffs.",
        ],
      },
      {
        heading: "Common interview questions",
        body: [
          "Practice these questions with real situations from your past work, even if your title was not customer success.",
        ],
        bullets: [
          "How do you build trust with a new customer?",
          "How do you handle an unhappy customer?",
          "How do you explain a product limitation?",
          "How do you prioritize accounts?",
          "How do you identify churn risk?",
          "How do you work with sales, support and product teams?",
          "Tell me about a time you turned a negative customer situation around.",
          "How do you document customer conversations?",
          "What metrics matter in customer success?",
          "How do you manage follow-ups remotely?",
        ],
      },
      {
        heading: "Strong answer for an unhappy customer",
        body: [
          "This question tests empathy and control. Do not blame the customer or promise things you cannot deliver.",
        ],
        sample: {
          label: "Sample answer",
          items: [
            "First, I would acknowledge the customer's frustration and make sure I understand the real impact. Then I would summarize the issue in simple language, explain what I can do now and set a clear next step. If another team is needed, I would document the case and follow up with a realistic timeline. My goal is to make the customer feel heard while keeping the solution honest.",
          ],
        },
      },
      {
        heading: "Useful customer success vocabulary",
        body: [
          "Use role-specific words naturally. They help show that you understand the function.",
        ],
        bullets: [
          "Onboarding",
          "Adoption",
          "Retention",
          "Renewal",
          "Expansion",
          "Churn risk",
          "Escalation",
          "QBR",
          "Health score",
          "Stakeholder",
          "Playbook",
          "Handoff",
        ],
      },
    ],
    faqs: [
      {
        question: "Do customer success roles require C1 English?",
        answer:
          "Many do, because the role is client-facing and often requires nuance. Strong B2 candidates can still compete for junior or support-adjacent roles.",
      },
      {
        question: "What metrics should I mention?",
        answer:
          "Retention, adoption, renewal, customer satisfaction, response time and expansion are common metrics, depending on the company.",
      },
      {
        question: "How can I practice customer success English?",
        answer:
          "Practice explaining product value, writing follow-ups, handling objections and documenting customer risk in English.",
      },
    ],
    relatedSlugs: [
      "english-level-remote-jobs-b2-c1",
      "slack-update-examples-english",
      "remote-job-interview-questions-english",
    ],
  },
  {
    slug: "sdr-interview-questions-english",
    title: "SDR Interview Questions in English for Remote Sales Jobs",
    description:
      "Prepare for SDR and remote sales interviews in English with answers for prospecting, rejection, CRM habits and outbound communication.",
    category: "Role Interviews",
    cluster: "Remote interviews",
    intent: "Prepare for SDR and sales interviews",
    primaryKeyword: "SDR interview questions",
    secondaryKeywords: [
      "sales interview English",
      "remote sales jobs",
      "SDR interview answers",
    ],
    excerpt:
      "Remote SDR roles reward clear writing, consistent follow-up, CRM discipline and calm handling of rejection.",
    readTime: "10 min read",
    publishedAt: "2026-06-03",
    updatedAt: "2026-06-03",
    cta: {
      label: "Practice sales interview English",
      href: "/ai-english-trainer",
    },
    sections: [
      {
        heading: "What remote SDR interviews test",
        body: [
          "An SDR interview tests whether you can communicate clearly, handle rejection, research accounts, follow a process and write professional outreach in English.",
          "Remote sales teams also care about CRM discipline. If your activity is not documented, managers cannot coach you or forecast pipeline.",
        ],
      },
      {
        heading: "Common SDR interview questions",
        body: [
          "Prepare answers that show process, not just personality.",
        ],
        bullets: [
          "Why are you interested in sales?",
          "How do you handle rejection?",
          "How would you research a prospect?",
          "Write a short cold email for this company.",
          "How do you prioritize leads?",
          "What would you do if a prospect says they are not interested?",
          "How do you use a CRM?",
          "Tell me about a goal you had to hit.",
          "How do you stay consistent when results are slow?",
          "What makes a good discovery question?",
        ],
      },
      {
        heading: "Strong answer for rejection",
        body: [
          "This answer should show resilience and learning, not emotional toughness only.",
        ],
        sample: {
          label: "Sample answer",
          items: [
            "I see rejection as part of the process, but I still try to learn from it. If a prospect says no, I check whether the message was relevant, whether the timing was wrong or whether I targeted the wrong persona. I document the outcome in the CRM and move to the next account. Consistency matters, but so does improving the quality of each touchpoint.",
          ],
        },
      },
      {
        heading: "Simple cold email structure",
        body: [
          "A remote SDR should be able to write concise outreach in English.",
        ],
        sample: {
          label: "Cold email template",
          items: [
            "Subject: Quick idea for [company]",
            "Hi [Name], I noticed [specific signal]. Many [type of companies] struggle with [problem]. [Company/product] helps teams [outcome]. Would it be worth a quick conversation to see if this is relevant for [company]?",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Do SDR roles require advanced English?",
        answer:
          "Often yes, because the role involves persuasion, writing and live calls. Strong C1 is helpful, but structured B2 candidates can start in junior or appointment-setting roles.",
      },
      {
        question: "What tools should an SDR know?",
        answer:
          "Common tools include CRM platforms, email sequencing tools, LinkedIn Sales Navigator, calendars and call recording or dialer tools.",
      },
      {
        question: "What should I practice before an SDR interview?",
        answer:
          "Practice cold emails, objection handling, role-play calls, prospect research and explaining your sales process in English.",
      },
    ],
    relatedSlugs: [
      "best-remote-jobs-latam-english-level-2026",
      "why-do-you-want-to-work-remotely-answer",
      "slack-update-examples-english",
    ],
  },
  ...roleBlogPosts,
];

export const featuredBlogPosts = blogPosts.slice(0, 3);

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost) {
  return post.relatedSlugs
    .map((slug) => getBlogPost(slug))
    .filter((relatedPost): relatedPost is BlogPost => Boolean(relatedPost));
}

export const blogClusters = Array.from(new Set(blogPosts.map((post) => post.cluster)));
