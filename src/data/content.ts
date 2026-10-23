import type { FasnEvent, OfficialLink, Opportunity, ResourceGroup } from "./types";

/**
 * DEMO FIXTURES — sample events. Dates and venues are placeholders and every
 * entry is labeled "Demo" in the UI. Replace with real events before launch.
 */
export const events: FasnEvent[] = [
  {
    slug: "fasn-launch-mixer",
    type: "networking",
    format: "inPerson",
    title: { en: "FASN Launch Networking Night", fr: "Soirée networking de lancement FASN" },
    description: {
      en: "Meet founders, business owners and professionals from across the DMV. Bilingual introductions, light refreshments.",
      fr: "Rencontrez fondateurs, chefs d’entreprise et professionnels de toute la région DMV. Présentations bilingues, rafraîchissements.",
    },
    date: "2026-12-03",
    time: "18:30",
    location: { en: "Washington, D.C. — venue to be announced", fr: "Washington D.C. — lieu à confirmer" },
    demo: true,
  },
  {
    slug: "llc-in-the-usa-workshop",
    type: "workshop",
    format: "online",
    title: { en: "Starting a Business in the U.S.: LLC, EIN & Banking", fr: "Créer son entreprise aux États-Unis : LLC, EIN et banque" },
    description: {
      en: "A practical, bilingual walkthrough of the first steps to set up a U.S. business. Educational only — not legal advice.",
      fr: "Un parcours pratique et bilingue des premières étapes pour créer une entreprise aux États-Unis. À visée pédagogique — pas un conseil juridique.",
    },
    date: "2026-12-10",
    time: "19:00",
    location: { en: "Online", fr: "En ligne" },
    demo: true,
  },
  {
    slug: "govcon-101",
    type: "govcon",
    format: "hybrid",
    title: { en: "Government Contracting 101", fr: "Marchés publics : les bases" },
    description: {
      en: "SAM.gov registration, capability statements and how small businesses find subcontracting opportunities.",
      fr: "Inscription sur SAM.gov, capability statement et comment les petites entreprises trouvent des opportunités de sous-traitance.",
    },
    date: "2027-01-14",
    time: "18:00",
    location: { en: "Northern Virginia & online", fr: "Nord de la Virginie et en ligne" },
    demo: true,
  },
  {
    slug: "ai-for-small-business",
    type: "ai",
    format: "online",
    title: { en: "AI Tools for Small Businesses", fr: "L’IA au service des petites entreprises" },
    description: {
      en: "Hands-on session: using AI for marketing, quotes, customer service and bookkeeping — responsibly.",
      fr: "Atelier pratique : utiliser l’IA pour le marketing, les devis, le service client et la comptabilité — de manière responsable.",
    },
    date: "2027-01-27",
    time: "12:00",
    location: { en: "Online", fr: "En ligne" },
    demo: true,
  },
  {
    slug: "founder-pitch-night",
    type: "pitch",
    format: "inPerson",
    title: { en: "Francophone Founder Pitch Night", fr: "Soirée pitch des fondateurs francophones" },
    description: {
      en: "Early-stage founders pitch to a panel of mentors and investors, followed by networking.",
      fr: "Des fondateurs en début de parcours pitchent devant un jury de mentors et d’investisseurs, suivi d’un moment networking.",
    },
    date: "2027-02-18",
    time: "18:30",
    location: { en: "Maryland — venue to be announced", fr: "Maryland — lieu à confirmer" },
    demo: true,
  },
];

/**
 * DEMO FIXTURES — illustrate how opportunities are organized.
 * They are NOT real programs and are labeled "Demo" in the UI.
 */
export const opportunities: Opportunity[] = [
  {
    slug: "example-small-business-grant",
    type: "grant",
    title: { en: "Example: Local small-business growth grant", fr: "Exemple : subvention locale à la croissance des petites entreprises" },
    description: {
      en: "Shows how a grant listing will display eligibility, region, deadline and the official source link.",
      fr: "Montre comment une subvention affichera l’éligibilité, la région, la date limite et le lien vers la source officielle.",
    },
    eligibility: { en: "Small businesses located in the region", fr: "Petites entreprises situées dans la région" },
    region: { en: "D.C.", fr: "D.C." },
    deadline: "2027-03-31",
    demo: true,
  },
  {
    slug: "example-accelerator-cohort",
    type: "accelerator",
    title: { en: "Example: Early-stage accelerator cohort", fr: "Exemple : promotion d’un accélérateur early-stage" },
    description: {
      en: "Shows how accelerators and incubators will appear, with stage requirements and application windows.",
      fr: "Montre comment les accélérateurs et incubateurs apparaîtront, avec les critères de stade et les périodes de candidature.",
    },
    eligibility: { en: "Pre-seed and seed startups", fr: "Startups en pré-amorçage et amorçage" },
    region: { en: "DMV region", fr: "Région DMV" },
    deadline: "2027-02-15",
    demo: true,
  },
  {
    slug: "example-subcontracting",
    type: "government",
    title: { en: "Example: Subcontracting opportunity", fr: "Exemple : opportunité de sous-traitance" },
    description: {
      en: "Shows how government-contracting opportunities will be summarized, with a link back to the official notice.",
      fr: "Montre comment les opportunités de marchés publics seront résumées, avec un lien vers l’avis officiel.",
    },
    eligibility: { en: "Registered small businesses", fr: "Petites entreprises enregistrées" },
    region: { en: "Virginia", fr: "Virginie" },
    deadline: null,
    demo: true,
  },
  {
    slug: "example-cloud-credits",
    type: "credits",
    title: { en: "Example: Cloud credits for startups", fr: "Exemple : crédits cloud pour startups" },
    description: {
      en: "Shows how technology-credit programs will be listed for founders building software products.",
      fr: "Montre comment les programmes de crédits technologiques seront présentés aux fondateurs de produits logiciels.",
    },
    eligibility: { en: "Early-stage software startups", fr: "Startups logicielles en démarrage" },
    region: { en: "United States", fr: "États-Unis" },
    deadline: null,
    demo: true,
  },
];

/**
 * Official public sources. These are real organizations; re-check every link
 * before launch and periodically afterward (see README "Before launch").
 */
export const officialSources: OfficialLink[] = [
  {
    name: "U.S. Small Business Administration — Funding programs",
    url: "https://www.sba.gov/funding-programs",
    scope: "US",
    description: { en: "Loans, investment capital, disaster assistance and grants.", fr: "Prêts, capital-investissement, aide en cas de catastrophe et subventions." },
  },
  {
    name: "Grants.gov",
    url: "https://www.grants.gov",
    scope: "US",
    description: { en: "Search federal grant opportunities.", fr: "Recherche de subventions fédérales." },
  },
  {
    name: "SAM.gov",
    url: "https://sam.gov",
    scope: "US",
    description: { en: "Entity registration and federal contract opportunities.", fr: "Enregistrement des entités et appels d’offres fédéraux." },
  },
  {
    name: "SBIR / STTR",
    url: "https://www.sbir.gov",
    scope: "US",
    description: { en: "Federal research & development funding for small businesses.", fr: "Financement fédéral de la R&D pour les petites entreprises." },
  },
  {
    name: "eMaryland Marketplace Advantage (eMMA)",
    url: "https://emma.maryland.gov",
    scope: "MD",
    description: { en: "Maryland state procurement opportunities.", fr: "Marchés publics de l’État du Maryland." },
  },
  {
    name: "eVA — Virginia’s procurement portal",
    url: "https://eva.virginia.gov",
    scope: "VA",
    description: { en: "Virginia state procurement opportunities.", fr: "Marchés publics de l’État de Virginie." },
  },
];

const sba: OfficialLink = {
  name: "SBA Business Guide",
  url: "https://www.sba.gov/business-guide",
  scope: "US",
  description: { en: "Plan, launch, manage and grow your business.", fr: "Planifier, lancer, gérer et développer son entreprise." },
};
const score: OfficialLink = {
  name: "SCORE",
  url: "https://www.score.org",
  scope: "US",
  description: { en: "Free mentoring and workshops for small businesses.", fr: "Mentorat et ateliers gratuits pour petites entreprises." },
};
const sbdc: OfficialLink = {
  name: "America’s SBDC",
  url: "https://americassbdc.org",
  scope: "US",
  description: { en: "Find your local Small Business Development Center.", fr: "Trouvez votre centre local de développement des petites entreprises." },
};

export const resourceGroups: ResourceGroup[] = [
  {
    key: "start",
    title: { en: "Start a business", fr: "Créer une entreprise" },
    topics: {
      en: ["LLC formation", "EIN", "Business banking", "Business plans", "Insurance", "Licensing"],
      fr: ["Création de LLC", "Numéro EIN", "Compte bancaire professionnel", "Business plan", "Assurances", "Licences"],
    },
    links: [
      sba,
      {
        name: "IRS — Small business & self-employed",
        url: "https://www.irs.gov/businesses/small-businesses-self-employed",
        scope: "US",
        description: { en: "EIN, business taxes and filing requirements.", fr: "EIN, impôts des entreprises et obligations déclaratives." },
      },
      {
        name: "D.C. Department of Licensing and Consumer Protection",
        url: "https://dlcp.dc.gov",
        scope: "DC",
        description: { en: "Business registration and licensing in D.C.", fr: "Immatriculation et licences à D.C." },
      },
      {
        name: "Maryland Business Express",
        url: "https://businessexpress.maryland.gov",
        scope: "MD",
        description: { en: "Start and register a business in Maryland.", fr: "Créer et enregistrer une entreprise dans le Maryland." },
      },
      {
        name: "Virginia State Corporation Commission",
        url: "https://www.scc.virginia.gov",
        scope: "VA",
        description: { en: "Business entity registration in Virginia.", fr: "Enregistrement des sociétés en Virginie." },
      },
    ],
  },
  {
    key: "mentoring",
    title: { en: "Free advising & mentoring", fr: "Conseil et mentorat gratuits" },
    topics: {
      en: ["One-on-one advising", "Business plans", "Workshops", "Market research"],
      fr: ["Conseil individuel", "Business plan", "Ateliers", "Étude de marché"],
    },
    links: [score, sbdc],
  },
  {
    key: "funding",
    title: { en: "Funding", fr: "Financement" },
    topics: {
      en: ["Grants", "SBA-backed loans", "Investors", "Accelerators"],
      fr: ["Subventions", "Prêts garantis par la SBA", "Investisseurs", "Accélérateurs"],
    },
    links: [officialSources[0], officialSources[1], officialSources[3]],
  },
  {
    key: "technology",
    title: { en: "Technology & cybersecurity", fr: "Technologie et cybersécurité" },
    topics: {
      en: ["Websites", "Business email", "Cloud infrastructure", "Cybersecurity", "AI", "Automation"],
      fr: ["Sites web", "Messagerie professionnelle", "Infrastructure cloud", "Cybersécurité", "IA", "Automatisation"],
    },
    links: [
      {
        name: "CISA — Cybersecurity Agency",
        url: "https://www.cisa.gov",
        scope: "US",
        description: { en: "Cybersecurity guidance, including for small businesses.", fr: "Conseils de cybersécurité, y compris pour les petites entreprises." },
      },
      {
        name: "FTC — Business guidance",
        url: "https://www.ftc.gov/business-guidance",
        scope: "US",
        description: { en: "Data security, privacy and advertising rules.", fr: "Sécurité des données, vie privée et règles publicitaires." },
      },
    ],
  },
  {
    key: "marketing",
    title: { en: "Marketing & finance", fr: "Marketing et finances" },
    topics: {
      en: ["Branding", "SEO", "Social media", "Bookkeeping", "Taxes", "Business credit"],
      fr: ["Image de marque", "Référencement", "Réseaux sociaux", "Comptabilité", "Impôts", "Crédit professionnel"],
    },
    links: [sba, sbdc],
  },
  {
    key: "construction",
    title: { en: "Construction business", fr: "Entreprise du bâtiment" },
    topics: {
      en: ["Contractor licensing", "Insurance", "Estimating", "Customer management", "Safety"],
      fr: ["Licences d’entrepreneur", "Assurances", "Chiffrage", "Gestion clients", "Sécurité"],
    },
    links: [
      {
        name: "Maryland Home Improvement Commission",
        url: "https://www.labor.maryland.gov/license/mhic/",
        scope: "MD",
        description: { en: "Home-improvement contractor licensing in Maryland.", fr: "Licences des entrepreneurs en rénovation dans le Maryland." },
      },
      {
        name: "Virginia DPOR",
        url: "https://www.dpor.virginia.gov",
        scope: "VA",
        description: { en: "Contractor and trade licensing in Virginia.", fr: "Licences des entrepreneurs et métiers en Virginie." },
      },
      {
        name: "D.C. DLCP",
        url: "https://dlcp.dc.gov",
        scope: "DC",
        description: { en: "Business and contractor licensing in D.C.", fr: "Licences commerciales et d’entrepreneur à D.C." },
      },
    ],
  },
];

export const govconLinks: OfficialLink[] = [
  officialSources[2],
  {
    name: "SBA — Federal contracting",
    url: "https://www.sba.gov/federal-contracting",
    scope: "US",
    description: { en: "Contracting basics and small-business certification programs.", fr: "Bases des marchés publics et programmes de certification." },
  },
  {
    name: "APEX Accelerators",
    url: "https://www.apexaccelerators.us",
    scope: "US",
    description: { en: "Free help to compete for government contracts.", fr: "Aide gratuite pour répondre aux marchés publics." },
  },
  {
    name: "D.C. Department of Small and Local Business Development",
    url: "https://dslbd.dc.gov",
    scope: "DC",
    description: { en: "Certified Business Enterprise (CBE) program in D.C.", fr: "Programme Certified Business Enterprise (CBE) à D.C." },
  },
  officialSources[4],
  {
    name: "Virginia Department of Small Business & Supplier Diversity",
    url: "https://www.sbsd.virginia.gov",
    scope: "VA",
    description: { en: "SWaM certification and supplier programs in Virginia.", fr: "Certification SWaM et programmes fournisseurs en Virginie." },
  },
  officialSources[5],
];
