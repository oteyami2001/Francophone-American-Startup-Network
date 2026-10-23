---
name: fasn-website
description: Product, brand, content and trust rules for building the Francophone-American Startup Network (FASN) website. Use for any change to pages, copy, design, data or features in this repo.
---

# Francophone-American Startup Network — Claude Website Build Skill

## Purpose
Use this skill to design and build the Francophone-American Startup Network (FASN) website.

FASN is an original bilingual (English/French) entrepreneurship and business ecosystem. It launches in Washington, D.C., Maryland, and Virginia, with architecture and branding suitable for later U.S. expansion.

## Important originality rule
Use Colectivo only as high-level product/UX inspiration. Do NOT copy its source code, proprietary text, images, logos, brand identity, or exact page layouts. Build an original FASN experience.

## Product principles
1. Community first: make joining, discovering people, and getting help obvious.
2. Three-part journey: Connect → Build → Grow.
3. One identity: one account/profile should power community, directories, events, opportunities, and matching.
4. Bilingual by design: EN/FR navigation and core content.
5. Local launch, national architecture: DMV first; do not hard-code the brand to DMV.
6. Trust: moderation, privacy controls, honest credentials, and clear verification status.
7. Mobile-first and accessible.

## Primary audiences
- Founders and aspiring founders
- Small-business owners
- Investors and mentors
- Operators and professionals
- Contractors/trades/home-service companies
- Customers looking for local services
- Partners, accelerators, universities, banks, and sponsors

## Core IA / navigation
Home
Community
Startups
Businesses
Professionals
Contractors
Marketplace
Events
Opportunities
Jobs
Resources
About
Contact

Primary CTAs:
- Join the Network
- Find a Business
- List Your Business
- Request a Quote

## Homepage blueprint
1. Header: logo, navigation, EN/FR, sign in, Join Network.
2. Hero:
   - FRANCOPHONE-AMERICAN STARTUP NETWORK
   - “Your Business. Your Network. Your Opportunity.”
   - “Connecting Francophone Entrepreneurs with the American Business Ecosystem.”
   - CTAs: Join Network / Explore Network.
3. Trust/partner strip (only real partners; no fabricated logos).
4. Connect / Build / Grow:
   - Connect: founders, businesses, professionals, mentors.
   - Build: resources, AI guidance, training, government contracting.
   - Grow: customers, funding, events, jobs, partnerships.
5. Explore the ecosystem: searchable cards/directories.
6. Featured startups/businesses (database-driven; no fake companies in production).
7. Contractor/service discovery and Request a Quote.
8. Opportunities: grants, accelerators, contracts, training.
9. Events.
10. Community stories/testimonials (real, consented content only).
11. Final CTA.
12. Footer with legal/privacy/community rules.

## Directory features
### Startups
Company, founder, location, industry, stage, website, products/services, team, “looking for” tags.

### Businesses
Business name, owner, description, category, service area, languages, hours, contact, website, photos.

### Contractors
Categories include landscaping, plumbing, electrical, remodeling, roofing, painting, cleaning, HVAC, windows, concrete, flooring, carpentry, general contracting, property maintenance, handyman.

Contractor profile should support project gallery, service area, languages, contact, Request Quote, and clearly labeled license/insurance information. Never imply verification unless actually verified.

### Professionals
CPA/tax, legal, consulting, technology, cloud, cybersecurity, web, marketing, insurance, real estate, finance, recruiting, design.

## Community features
- Member profiles
- Founder profiles
- Posts/comments
- Mentor directory and mentorship requests
- Theme days: #MardiTech/#TechTuesday, #JeudiEntraide/#HelpfulThursday, #VendrediFondateurs/#FounderFriday
- Reporting/moderation

## Request-a-Quote flow
Service → ZIP/location → project details → desired date → optional budget → photo upload → consent → route to eligible providers.
Protect customer contact information and prevent unsolicited spam.

## Opportunities
Support grants, investors, loans, accelerators, incubators, pitch competitions, government programs/contracts, technology credits, and training. Store eligibility, geography, deadline, source URL, and last-verified date.

## Jobs
Full-time, part-time, internships, freelance, trade/construction, technology projects, consulting, cofounder opportunities.

## AI assistant
Working name: “FASN Business AI.”
Purpose: navigation, resource discovery, and educational business guidance.
It must not fabricate grants, legal requirements, licenses, or funding. For legal/tax/financial/licensing questions, distinguish education from professional advice and route to official resources or qualified professionals.

## Visual system
Use the selected brand direction:
- Navy: #0B2D5B
- Teal: #00C2A8
- White / neutral backgrounds
Logo concept: people/community embracing a globe.
Tone: modern, premium, welcoming, credible, entrepreneurial.
Avoid copying Colectivo’s visual identity.

## Recommended stack
- Next.js + React + TypeScript
- Tailwind CSS
- PostgreSQL
- Auth: Cognito or Supabase Auth
- Object storage: S3 or equivalent
- Email: SES or equivalent
- Deployment: AWS
- IaC: Terraform or CloudFormation
- Monitoring/logging and backups
Choose equivalent tools if the existing project already has a coherent stack.

## Core data entities
User, Profile, Company, Startup, Business, Contractor, Professional, Category, Service, Location, Review, QuoteRequest, Event, Registration, Job, Application, Mentor, MentorshipRequest, Opportunity, MarketplaceListing, Post, Comment, Notification, Membership.

## Security/privacy
HTTPS; secure auth; email verification; admin MFA; RBAC; rate limits; input validation; upload restrictions; moderation; audit logging; backups; privacy controls.
Never expose private phone/email by default.
Never hard-code secrets.
Do not invent licenses, reviews, member counts, partnerships, or funding opportunities.

## SEO/accessibility
Semantic HTML, WCAG-oriented contrast and keyboard support, descriptive alt text, metadata, OpenGraph, sitemap, structured data where appropriate, localized EN/FR routes, fast Core Web Vitals.

## MVP priority
Phase 1:
- Home/About/Contact
- EN/FR
- Authentication/profile
- Startup/business/contractor/professional directories
- Business profiles
- Events/resources
- Request a Quote
- Admin moderation

Phase 2:
Community discussions, mentors, reviews, jobs, marketplace, opportunities, notifications.

Phase 3:
AI assistant and matching/recommendations.

Phase 4:
Paid memberships, featured listings, sponsorships, premium events/training.

## Definition of done for every build task
- Responsive at mobile/tablet/desktop
- EN/FR strings handled cleanly
- No fake production data presented as real
- Empty/loading/error states
- Accessible controls
- Secure validation
- Tests for critical flows
- No console errors
- No horizontal overflow at 320px
- Original design and copy
