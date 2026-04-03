# PawsHub App Design Guidelines




This document outlines the design system, visual direction, and screen-by-screen structure for the PawsHub mobile app, intended to guide UI generation.




## 1. Product & Design Vision

**PawsHub** is an all-in-one pet care and adoption app. The design should feel warm, trustworthy, organized, modern, calm, and premium but friendly.




**Primary theme:** Blue-900 led visual system  

**Mood:** Dependable, safe, premium, calm




### Brand Feel

- Deep navy core

- Soft cool neutrals

- High readability

- Trust-building whites and muted accent tones

- Subtle rounded shapes




---




## 2. Visual Design System




### Color Palette




#### Primary Colors

- `blue-900` — Primary brand, headers, main CTAs

- `blue-800` — Pressed states, cards, highlighted sections

- `blue-700` — Secondary CTA and active indicators




#### Supporting Neutrals

- `slate-950` — Primary text on light backgrounds

- `slate-800` — Secondary headings

- `slate-600` — Body secondary text

- `slate-400` — Placeholders, dividers

- `slate-200` — Borders

- `slate-100` — Muted surfaces

- `white` — Cards, backgrounds, reversed text




#### Semantic Colors

- `emerald-600` — Success, completed vaccines

- `amber-500` — Upcoming reminders

- `rose-500` — Urgent, overdue, destructive

- `sky-500` — Info states

- `violet-500` — Community highlights

- `teal-500` — Adoption accent or rescue-related status




*(Distribution: ~60% white/light surfaces, 25% slate neutrals, 10% blue brand surfaces, 5% semantic highlights)*




### Typography

*(System-friendly fonts with clean readability)*

- **Display:** 32 / 40

- **H1:** 28 / 36

- **H2:** 24 / 32

- **H3:** 20 / 28

- **Title:** 18 / 26

- **Body:** 16 / 24

- **Caption:** 14 / 20

- **Micro:** 12 / 16




*Usage:* Bold/semibold for titles and metrics, Medium for interactive labels, Regular for body content. 




### Spacing & Rhythm

- **Base spacing unit:** 4 (Common: 4, 8, 12, 16, 20, 24, 32, 40)

- **Screen horizontal padding:** 16 to 20

- **Card gap:** 12 to 16

- **Section gap:** 20 to 24

- **Large section separation:** 32




### Radius & Elevation

- **Small controls:** 10

- **Inputs:** 12

- **Cards:** 16

- **Bottom sheets:** 24

- **Hero cards:** 28

*Shadows:* Low shadow for cards, medium shadow for floating actions/modals. Avoid heavy dramatic shadows.




### Iconography

- Simple line icons, rounded edges, consistent stroke width (suggested: Lucide icons).

- Key icons: home, heart, paw, syringe, stethoscope, bell, calendar, map-pin, users, file-text.




---




## 3. Design System Components




### Buttons

- **Primary:** Background `blue-900`, text `white`, rounded-xl (12-16px), min-height 48px.

- **Secondary:** Background `blue-50` or `slate-100`, text `blue-900`.

- **Ghost:** Transparent background, text emphasis only.

- **Destructive:** `rose-500` styling.




### Inputs

- Rounded (radius 12).

- Clean focus ring, error state support.

- Optional left icon / helper text.




### Cards (Reminders, Pets, Vets, Posts)

- White background, 16 radius, 12 to 16 padding.

- Subtle border (`slate-200`) or very light shadow.

- One clear focal point or primary action per card.




### Chips and Tags

- Used for pet types, vaccine status, adoption categories.

- High contrast but soft backgrounds (e.g., light green bg with dark green text for "Vaccinated").




### Navigation

- **Bottom Tab Bar:** Home, Pets, Discover, Community, Profile (with labels).

- **Stack Navigation:** For deep diving into details.

- **Headers:** Top header with contextual actions.




---




## 4. Screen-by-Screen Layouts




### 4.1 Onboarding & Auth

- **Splash:** PawsHub logo, subtle paw line art, `blue-900` or white background.

- **Welcome Slides:** Value props (Health, Care, Adopt). Illustrations with title/subtitle.

- **Auth (Log In / Sign Up):** Name, Email, Password, CTA buttons.

- **Add First Pet:** Form capturing pet photo, name, species, breed, age, weight.




### 4.2 Home Dashboard

- **Header:** Greeting ("Hello, [Name]"), User Avatar, Notification Bell.

- **Active Pet Summary Card:** Pet image, name, age, health score, "switch pet" switcher.

- **Reminders Section:** Horizontal scrolling cards for vaccine due, medication due, appointments.

- **Quick Actions (Grid/Row):** Log vaccine, Find vet, Post for adoption.

- **Nearby Vets Preview:** 2-3 small vet cards indicating distance.

- **Community Highlights:** A pinned/trending adoption or community post.




### 4.3 Pets Tab

- **Pets List:** Vertical list/grid of pet cards (Avatar, name, species, breed, due reminder count).

- **Pet Profile Detail:** Hero image with identity info, quick health overview, and list of records shortcuts (Vaccine Tracker, Medications, Appointments, Documents).




### 4.4 Discover Tab (Vets & Adoption)

- **Discover Landing:** Search bar, category chips (Vets, Adoption, Shelters).

- **Nearby Vets List:** Searchable list of vet cards (Clinic name, distance, rating, "Call" or "Directions" buttons).

- **Adoption Listings:** Grid of adoptable pets with filters (type, age, gender). Pet card features image, name, tag line, and "Rescue Verified" badge.

- **Adoption Detail:** Deep dive into pet photos, medical status, temperament, requirements, and "Apply to Adopt" CTA.




### 4.5 Community Tab

- **Feed:** Vertical scroll of user posts. Items include user avatar, pet tag, text, image, and engagement actions (like, comment, share, save).

- Categories: Health, Adoption, Training, Nutrition.




### 4.6 Profile & Settings

- **Profile:** Avatar, number of pets, saved vets, user's posts, and settings link.

- **Settings:** Toggles for notifications (reminders, alerts), location preferences, and account controls.




---




## 5. Tailwind / NativeWind Token Direction




When building UI, use these semantic Tailwind-friendly token mappings:

- **brand-primary:** `bg-blue-900`

- **brand-secondary:** `bg-blue-700`

- **brand-muted:** `bg-slate-100`

- **text-primary:** `text-slate-950`

- **text-secondary:** `text-slate-600`

- **success:** `text-emerald-600` (or `bg-emerald-100` for soft backgrounds)

- **warning:** `text-amber-500`

- **danger:** `text-rose-500`




### Recommended UI Component Wrappers

- `AppHeader`, `SectionHeader`

- `PrimaryButton`, `SecondaryButton`

- `AppInput`, `SearchInput`

- `PetAvatar`, `StatusChip`, `FilterChip`

- `PetCard`, `ReminderCard`, `VetCard`, `AdoptionCard`, `PostCard`