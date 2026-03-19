# Premium Doctor Booking Website MVP

## 1. Product Definition

### Goal
Create a premium, trustworthy doctor booking website for a private doctor friend. The MVP should help prospective patients understand the doctor's offer and submit a health-check meeting request with a clean confirmation flow.

### Primary User
- Adults aged roughly 40-65
- Likely booking on mobile first, but may complete forms on desktop
- Values trust, clarity, credentials, and simplicity over novelty

### Core Job To Be Done
"I want to quickly understand who this doctor is, what the health-check includes, and request an appointment without confusion."

### MVP Success Criteria
- A visitor can understand the doctor and services within 30 seconds
- A visitor can complete the booking flow in under 2 minutes
- The UI feels premium, clean, white/blue, calm, and credible
- Form submission persists to a backend store and returns a confirmation state

## 2. Information Architecture

### Top-Level Sections
1. Hero / landing
2. Doctor introduction
3. Services
4. Trust and credentials
5. Booking form
6. Confirmation

### Navigation
- Logo / doctor name
- Services
- About Doctor
- Trust
- Book Visit
- Sticky primary CTA: `Book Health Check`

## 3. Design Language

### Brand Direction
- Tone: premium, calm, competent, friendly
- Visual feel: private clinic, not hospital; modern but conservative
- Audience fit: larger type, strong spacing, obvious actions, low cognitive load

### Color System
- Primary background: warm white
- Primary brand: medical blue
- Secondary blue: soft sky blue for surfaces
- Text: deep navy / charcoal
- Success: muted green

### Suggested Tokens
- `--bg: #F9FBFD`
- `--surface: #FFFFFF`
- `--primary: #1F5FAF`
- `--primary-soft: #EAF3FF`
- `--text: #16324A`
- `--text-muted: #5E7488`
- `--border: #D8E4F0`
- `--success: #2E7D5A`

### Typography
- Headings: elegant serif or humanist serif feel
- Body/UI: highly legible sans serif
- Minimum body size: 17-18px on desktop, 16-17px on mobile
- Use strong contrast and short paragraphs

### UI Principles
- White cards, subtle shadows, soft radius
- Blue used for CTA, active states, trust accents
- Avoid clutter, heavy iconography, and crowded grids
- Keep forms linear and reassuring with helper text
- Use real-looking trust signals, not generic stock phrasing

## 4. Page Structure

### `/` Landing Page

#### Hero
- Doctor name and specialty
- One-line value proposition
- Primary CTA: `Book a Health Check`
- Secondary CTA: `Learn About the Doctor`
- Small trust strip: years experience, patient-first approach, easy booking

#### Doctor Intro
- Professional portrait
- Short biography
- 3-4 proof points:
  - Years of experience
  - Clinic philosophy
  - Areas of focus
  - Consultation style

#### Services
- Featured service card: `Comprehensive Health Check`
- Optional secondary cards:
  - Preventive consultation
  - Follow-up consultation
  - Lifestyle and screening review
- Each service includes:
  - Brief summary
  - Indicative duration
  - Who it is for

#### Trust Section
- Qualifications / certifications
- Clean clinic standards
- Confidential patient care
- Simple steps: book request -> confirmation call/email -> visit
- Optional testimonial placeholders for demo only

#### Booking Section
- Embedded booking form
- Clear note that this is a request, not instant guaranteed scheduling
- Reassurance on privacy and response time

#### Footer
- Clinic address placeholder
- Contact email / phone placeholder
- Hours placeholder
- Privacy note

### `/confirmation`
- Success message after booking request
- Summary of submitted details
- Expected next step and response time
- CTA back to homepage

## 5. Booking Flow

### Flow
1. User lands on homepage
2. User reads intro / services / trust content
3. User fills booking form
4. Client validates required fields
5. Form posts to backend API
6. Backend stores booking request
7. User is redirected to `/confirmation` with booking reference

### Required Form Fields
- Full name
- Age range
- Phone number
- Email
- Preferred contact method
- Preferred date
- Preferred time window
- Main concern / reason for visit
- Consent checkbox for contact and data handling

### Optional Fields
- Existing conditions
- Preferred doctor note

### Validation Rules
- Name: 2+ characters
- Phone: valid local/international pattern
- Email: valid format
- Preferred date: today or later
- Main concern: 10-500 characters
- Consent must be checked

## 6. API Contract

### `POST /api/bookings`
Create a booking request.

#### Request Body
```json
{
  "fullName": "Jane Doe",
  "ageRange": "45-54",
  "phone": "+1 555 123 4567",
  "email": "jane@example.com",
  "preferredContactMethod": "phone",
  "preferredDate": "2026-03-25",
  "preferredTimeWindow": "morning",
  "reasonForVisit": "Annual preventive health check and fatigue concerns.",
  "existingConditions": "Mild hypertension",
  "consentAccepted": true
}
```

#### Success Response
```json
{
  "bookingId": "bk_01HXYZ123",
  "status": "received",
  "message": "Your booking request has been received."
}
```

#### Error Response
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Preferred date must be today or later.",
  "fieldErrors": {
    "preferredDate": "Invalid date"
  }
}
```

### `GET /api/bookings/:bookingId`
Return booking details needed by the confirmation page.

#### Success Response
```json
{
  "bookingId": "bk_01HXYZ123",
  "status": "received",
  "fullName": "Jane Doe",
  "preferredDate": "2026-03-25",
  "preferredTimeWindow": "morning",
  "preferredContactMethod": "phone"
}
```

## 7. Data Model

### Booking
- `id`
- `createdAt`
- `fullName`
- `ageRange`
- `phone`
- `email`
- `preferredContactMethod`
- `preferredDate`
- `preferredTimeWindow`
- `reasonForVisit`
- `existingConditions`
- `consentAccepted`
- `status`

### Status Values
- `received`
- `contact_pending`
- `confirmed`
- `cancelled`

## 8. Demo Scope

### In Scope
- One polished homepage
- One confirmation page
- One booking API
- Server-side persistence using a simple local database or JSON-backed store
- Accessible, responsive UI for mobile and desktop
- Real form validation and submission states

### Out of Scope for MVP
- Patient login/accounts
- Online payment
- Doctor dashboard
- Calendar sync
- True appointment slot management
- Multi-language support
- Automated email/SMS delivery

## 9. Recommended Tech Shape

### Frontend
- Next.js app router or equivalent React SSR framework
- Server-rendered marketing content plus client-side form UX
- Componentized sections for hero, intro, services, trust, booking

### Backend
- Same app's API routes for MVP simplicity
- Simple persistence via SQLite or lightweight file-backed DB
- Schema validation with a shared validator

## 10. Content Notes for Demo

Use believable but clearly editable placeholder content:
- Doctor name, specialty, years of experience
- Clinic address, phone, and email placeholders
- Qualification placeholders that are structurally realistic

Avoid fake claims like exact awards, hospital affiliations, or patient review counts unless provided by the doctor.
