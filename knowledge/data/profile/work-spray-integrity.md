# Eric Niemeyer — Spray Integrity Program

## Product engineering scope

Eric led product engineering for the Spray Integrity Program, a connected set of tools for spray-foam contractors. The product includes a React Native Expo mobile application and a Vue and Laravel web portal. It combines product education, field workflows, estimates, jobs, customer and team records, support, referrals, rewards, and operational data rather than acting as a simple marketing application.

Because the platform was greenfield, requests were frequently incomplete or changed emphasis. Eric led detailed questioning in client meetings, whiteboarded the implied workflows, and followed with minutes, summaries, and high-level architectural interpretations for approval before implementation. This created a shared requirement record rather than relying on conversational memory.

## QR tracking and traceability

Spray-foam material barrels carry QR labels that connect physical inventory to digital records. Eric designed flows for scanning and moving material through meaningful states, supporting track-and-trace questions about products used in the field. Job records can also capture contextual information such as weather, time, and available light when those details matter to later review.

## Contractor workflows

The application helps contractors build estimates, manage customers and teams, complete job forms, access product information, and reach support resources. Eric had to turn varied field needs into interactions that remain usable on a phone, including users working away from a desk and workflows where quick scanning or structured forms are more practical than free-form data entry.

One architecture discussion concerned whether a physical barrel and its uses required separate one-to-many tables. Eric favored normalization, but repeated use was not a committed requirement and the team needed the requested system available quickly. After explaining the tradeoff, he accepted the simpler current model. The team shipped without adding speculative complexity that remained unnecessary later.

When the client later deprioritized a chatbot after development had begun, Eric hid the frontend through configuration, retained stable backend APIs, documented the effort and scope change, and redirected work to the new priority. TestFlight and related mobile distribution workflows let stakeholders evaluate those iterations without destructive rework.

## Rewards and mini-games

Eric added rewards, referrals, and gamified experiences tied to the contractor program. Mini-games built with React Native Game Engine include fishing, a spinning reward interaction, and a piñata-style game. These features show his ability to place game mechanics inside a production business application while keeping them integrated with the broader account and rewards experience.
