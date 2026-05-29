import type { RemoteJobAssetType } from "@/types";

export type RemoteJobAssetConfig = {
  id: RemoteJobAssetType;
  title: string;
  description: string;
  cta: string;
  prompt: string;
  placeholder: string;
};

export const remoteJobAssetConfigs: RemoteJobAssetConfig[] = [
  {
    id: "recruiter_message",
    title: "Recruiter message",
    description: "Generate a short professional message for recruiters or hiring managers.",
    cta: "Generate recruiter message",
    prompt:
      "Write a concise LinkedIn message to a recruiter. Mention role fit, relevant experience and a clear ask.",
    placeholder:
      "Role: Growth Marketer at a US SaaS company. My experience: content, communities, funnels. Goal: ask if they are open to a quick conversation.",
  },
  {
    id: "linkedin_headline",
    title: "LinkedIn headline",
    description: "Improve your headline so it communicates role, value and remote positioning.",
    cta: "Improve headline",
    prompt:
      "Create a LinkedIn headline in English that sounds professional and clear for remote opportunities.",
    placeholder:
      "I am a marketer who builds online communities and growth systems for digital businesses.",
  },
  {
    id: "linkedin_about",
    title: "LinkedIn about section",
    description: "Turn your experience into a stronger English profile summary.",
    cta: "Improve about section",
    prompt:
      "Improve this LinkedIn About section for international remote opportunities.",
    placeholder:
      "I have experience in marketing, online communities and business. I want remote opportunities with international companies.",
  },
  {
    id: "resume_bullet",
    title: "Resume / CV bullet",
    description: "Rewrite experience into outcome-focused English bullet points.",
    cta: "Improve CV bullet",
    prompt:
      "Rewrite this resume bullet in clear English with stronger action, outcome and business impact.",
    placeholder:
      "I managed social media and helped the company get more leads.",
  },
  {
    id: "follow_up_email",
    title: "Follow-up email",
    description: "Generate a professional follow-up after interviews or applications.",
    cta: "Generate follow-up",
    prompt:
      "Write a professional follow-up email after a remote job interview or application.",
    placeholder:
      "I interviewed yesterday for a marketing role. I want to thank them and reinforce my interest.",
  },
  {
    id: "salary_script",
    title: "Salary expectations script",
    description: "Prepare a confident answer without sounding insecure or aggressive.",
    cta: "Generate salary script",
    prompt:
      "Write a professional answer to salary expectations for an international remote role.",
    placeholder:
      "Role: Marketing Manager. I want to say I am flexible but looking for fair market compensation.",
  },
  {
    id: "interview_answer",
    title: "Interview answer bank",
    description: "Save a polished version of an answer you want to reuse in interviews.",
    cta: "Create answer asset",
    prompt:
      "Turn this interview answer into a polished answer-bank asset that the user can practice again.",
    placeholder:
      "Question: Tell me about yourself. My answer: I am Ricardo, I work in marketing, business and online communities...",
  },
];
