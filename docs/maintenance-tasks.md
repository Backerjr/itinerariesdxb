# Follow-up Maintenance Tasks

## Typo Fix
- **Issue:** The setup instructions in the README say "Clone repo and install deps", which drops the article "the" and uses the abbreviation "deps". This reads like an editing typo in otherwise formal instructions. 【F:README.md†L11-L14】
- **Task:** Update the sentence to "Clone the repo and install the dependencies" to keep the documentation polished and grammatically correct.

## Bug Fix
- **Issue:** The `BookingCard` component expects `booking.tourName`, `booking.pickup`, and `booking.reference`, but the Prisma schema defines the columns as `tour`, `date`, and no `pickup` or `reference`. Rendering the card with data from the API would crash or show blank values. 【F:components/BookingCard.tsx†L9-L13】【F:prisma/schema.prisma†L1-L9】
- **Task:** Align the card and schema by either renaming the Prisma fields (e.g., add `pickup` and `reference`, rename `tour` to `tourName`) or updating the component to use the existing schema fields so they match.

## Documentation Discrepancy
- **Issue:** The README promises that guests can "see their confirmed bookings" after entering name and email, but the current form handler only logs to the console and never calls the lookup API or renders results. 【F:README.md†L5-L31】【F:pages/index.tsx†L4-L44】
- **Task:** Extend the home page to call `/api/lookup`, handle success/error states, and render bookings (e.g., with `BookingCard`) so the UI matches the documented behaviour.

## Test Improvement
- **Issue:** There are no automated tests or scripts covering the `/api/lookup` endpoint, leaving success, 404, and 405 behaviours unverified. 【F:package.json†L7-L14】【F:pages/api/lookup.ts†L7-L24】
- **Task:** Introduce an API route test (using e.g. Jest or Vitest with Next.js API testing helpers) that exercises POST success, POST 404, and method-not-allowed responses to prevent regressions.
