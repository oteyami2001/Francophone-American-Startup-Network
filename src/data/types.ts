import type { Dictionary } from "@/i18n";
import type { Localized } from "@/i18n/config";

export type ListingKind = "startup" | "business" | "professional" | "contractor";
export type CategoryKey = keyof Dictionary["categories"];
export type LanguageCode = keyof Dictionary["languageNames"];
export type StageKey = keyof Dictionary["stages"];
export type LookingForKey = keyof Dictionary["lookingFor"];
export type CredentialStatus = keyof Dictionary["directory"]["credentialStatus"];
export type StateCode = "DC" | "MD" | "VA";

export interface Listing {
  slug: string;
  kind: ListingKind;
  name: string;
  category: CategoryKey;
  city: string;
  state: StateCode;
  languages: LanguageCode[];
  tagline: Localized;
  description: Localized;
  services: Localized<string[]>;
  /** Founder (startups) or owner (other kinds). Fictional for demo entries. */
  person?: string;
  stage?: StageKey;
  lookingFor?: LookingForKey[];
  teamSize?: number;
  serviceArea?: Localized;
  hours?: Localized;
  /** Only real, member-supplied URLs. Demo entries have none. */
  website?: string;
  credentials?: { license: CredentialStatus; insurance: CredentialStatus };
  /** Demo entries are samples for the preview site and must be labeled in the UI. */
  demo: boolean;
}

export type EventFormat = "inPerson" | "online" | "hybrid";
export type EventType = keyof Dictionary["events"]["types"];

export interface FasnEvent {
  slug: string;
  type: EventType;
  format: EventFormat;
  title: Localized;
  description: Localized;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  time: string;
  location: Localized;
  demo: boolean;
}

export type OpportunityType = keyof Dictionary["opportunities"]["types"];

export interface Opportunity {
  slug: string;
  type: OpportunityType;
  title: Localized;
  description: Localized;
  eligibility: Localized;
  region: Localized;
  /** ISO date or null for rolling deadlines */
  deadline: string | null;
  sourceUrl?: string;
  lastVerified?: string;
  demo: boolean;
}

export interface OfficialLink {
  name: string;
  url: string;
  description: Localized;
  /** Region the source covers */
  scope: "US" | StateCode;
}

export interface ResourceGroup {
  key: string;
  title: Localized;
  topics: Localized<string[]>;
  links: OfficialLink[];
}
