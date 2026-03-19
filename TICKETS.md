# Doctor Booking Site MVP Tickets

## Delivery Model

- Goal: ship a demoable MVP with low coordination overhead
- Principle: frontend and backend work in parallel with strict file ownership
- Shared contract source: `SPEC.md`

## Frontend Developer

### FE-01 Project Scaffold and Theme
- Build the app shell and global styling foundation
- Establish white/blue premium visual language and responsive layout rules
- Add typography, color tokens, spacing scale, buttons, inputs, cards, and section containers

### File Ownership
- `doctor-booking-site/src/app/layout.*`
- `doctor-booking-site/src/app/page.*`
- `doctor-booking-site/src/app/confirmation/page.*`
- `doctor-booking-site/src/app/globals.css`
- `doctor-booking-site/src/components/**`
- `doctor-booking-site/src/lib/content.ts`

### Acceptance Criteria
- Global theme matches spec tone and colors
- Desktop and mobile layouts both feel polished
- Components are reusable and accessible

## Frontend Developer

### FE-02 Landing Page Sections
- Implement hero, doctor intro, services, trust section, booking section, and footer
- Use realistic placeholder content sourced from `src/lib/content.ts`
- Ensure section order and CTA flow match `SPEC.md`

### File Ownership
- `doctor-booking-site/src/app/page.*`
- `doctor-booking-site/src/components/sections/**`
- `doctor-booking-site/src/components/ui/**`
- `doctor-booking-site/src/lib/content.ts`

### Acceptance Criteria
- All required homepage sections are present
- Primary CTA scrolls to booking form
- Copy hierarchy is easy for middle-aged users to scan

## Frontend Developer

### FE-03 Booking Form UX
- Build the booking request form UI
- Implement client-side validation, inline errors, loading state, and submit success redirect
- Submit to backend contract without embedding backend logic in UI files

### File Ownership
- `doctor-booking-site/src/components/booking/BookingForm.*`
- `doctor-booking-site/src/components/booking/form-schema.ts`
- `doctor-booking-site/src/lib/api-client.ts`

### Acceptance Criteria
- Required fields and consent are validated
- Failed submission surfaces friendly error messaging
- Successful submission redirects to `/confirmation?bookingId=...`

## Frontend Developer

### FE-04 Confirmation Experience
- Build a clean confirmation page that reads booking details by `bookingId`
- Present next steps, response time, and summary of submitted preferences

### File Ownership
- `doctor-booking-site/src/app/confirmation/page.*`
- `doctor-booking-site/src/components/booking/ConfirmationCard.*`
- `doctor-booking-site/src/lib/api-client.ts`

### Acceptance Criteria
- Valid booking ID shows summary state
- Missing or invalid booking ID shows a graceful fallback
- Page tone remains reassuring and premium

## Backend Developer

### BE-01 Booking API Contract
- Implement `POST /api/bookings` and `GET /api/bookings/:bookingId`
- Match request/response shapes from `SPEC.md`
- Centralize validation and error formatting

### File Ownership
- `doctor-booking-site/src/app/api/bookings/route.*`
- `doctor-booking-site/src/app/api/bookings/[bookingId]/route.*`
- `doctor-booking-site/src/server/validation/**`
- `doctor-booking-site/src/server/http/**`

### Acceptance Criteria
- POST validates payload and returns booking ID
- GET returns normalized booking details for confirmation
- Validation errors are field-specific and stable

## Backend Developer

### BE-02 Persistence Layer
- Add a simple persistence mechanism suitable for demo use
- Prefer SQLite for realism; JSON file store is acceptable only if it is wrapped behind a repository interface
- Ensure records survive server restarts during demo use

### File Ownership
- `doctor-booking-site/src/server/db/**`
- `doctor-booking-site/src/server/repositories/**`
- `doctor-booking-site/prisma/**` or `doctor-booking-site/src/data/**`

### Acceptance Criteria
- Booking records are stored and retrievable
- Persistence is isolated from route handlers
- Local setup remains simple for MVP

## Backend Developer

### BE-03 Booking Domain and Seed Data
- Define booking entity types, status defaults, and mapping helpers
- Provide any needed local seed or bootstrap support for demo environment

### File Ownership
- `doctor-booking-site/src/server/domain/**`
- `doctor-booking-site/src/server/types/**`
- `doctor-booking-site/src/server/seeds/**`

### Acceptance Criteria
- Default status is `received`
- Types align with API contract and storage model
- Demo data tooling does not affect production flow

## Shared Rules

- Do not edit another owner's files without explicit coordination
- If a new shared file is needed, create it under the owner that consumes it most
- API types should be imported from backend-owned contract files or generated types, not duplicated

## Suggested Build Order

1. Backend: finalize API routes, validation, and persistence skeleton
2. Frontend: ship visual shell and homepage sections with mocked submit
3. Backend: complete data storage and GET confirmation endpoint
4. Frontend: connect live submission and confirmation flow
5. Both: polish error states, accessibility, and demo content

## Handoff Notes

- Frontend may start immediately using the contract in `SPEC.md`
- Backend should publish one stable example payload and response set early
- If design exploration is needed, Stitch MCP can be used for layout ideation only; implementation should not wait on it
