# Design QA

## Target and evidence

- Visual target: `reference-mockup.jpg` (user-provided mockup, 853 x 1280).
- Reference reviewed directly before QA: `C:\Users\chris\Desktop\IconPeakwood\reference-mockup.jpg`.
- Desktop implementation evidence: `C:\Users\chris\Desktop\IconPeakwood\qa-main-preview-updated.png`.
- Separate floor-plan page evidence: `C:\Users\chris\Desktop\IconPeakwood\qa-floorplans-preview.png`.
- Maintenance page evidence: `C:\Users\chris\Desktop\IconPeakwood\qa-maintenance-local-desktop.png` and `C:\Users\chris\Desktop\IconPeakwood\qa-maintenance-local-mobile.png`.
- Mobile implementation evidence: `C:\Users\chris\Desktop\IconPeakwood\qa-implementation-mobile.png`.
- Mobile menu evidence: `C:\Users\chris\Desktop\IconPeakwood\qa-mobile-menu.png`.
- Desktop comparison viewport: 853 x 1280 CSS pixels.
- Mobile comparison viewport: 390 x 844 CSS pixels; full-page evidence is 390 x 3137.
- Default state was reviewed at the top of the page and through the full-page capture.

## Fidelity review

- Rebuilt the mockup composition: blurred branded header, two-tile brand lockup, hero image and copy, five-column feature rail with line icons, split story block, four-up image grid, three-panel location band, and compact dark footer.
- Re-skinned the mockup with Peakwood colors: `#70b7e1`, deep blue, charcoal, black, and white.
- Used local Peakwood source imagery and local brand assets from `public/assets`; no remote image hotlinks are used.
- Added a separate local `/floor-plans` page with the live site’s Studio, 1 Bedroom, and 2 Bedroom categories and 12 locally served source plan images; floor-plan cards open the local plan assets.
- Replaced the flat blue statement panel with a local bedroom photograph, branded overlay, and working `SCHEDULE A TOUR` contact CTA.
- Used the captured local Cormorant Garamond, Raleway, and Montserrat font files.
- Responsive behavior is implemented for the desktop mockup-sized layout and a stacked mobile layout.

## Interaction checks

- Mobile menu opens and closes through the header menu button; the open navigation is visible.
- Mobile menu remains visible below the header at the 390 x 844 breakpoint with all five navigation links accessible.
- The Floor Plans card navigates to the local `/floor-plans` page; the Amenities card opens a 19-item amenities dialog; the Gallery card opens a 12-image local gallery.
- Gallery images can be selected from the gallery dialog to open the lightbox; the close controls and Escape key dismiss the overlays.
- Floor-plan tabs switch between 6 Studio, 4 one-bedroom, and 2 two-bedroom cards; all rendered plan images report as loaded.
- Mobile gallery cards remain a complete two-column grid so the fourth image no longer leaves a blank slot; the statement panel now renders a real image on mobile.
- The amenities dialog includes the verified community and unit amenity lists plus office hours; all gallery dialog images report as loaded.
- The local `/maintenance` page provides six common issue examples and two working links to the explicitly provided official maintenance form.
- Link audit compared the implementation against the live source reference, while keeping the rebuild’s internal page navigation local.
- Amenities, gallery, neighborhood, and contact stay as local sections; the resident portal uses the verified LoftLiving destination; application uses the verified RealPage destination.
- The mockup’s Floor Plans navigation and hero CTA now open the local `/floor-plans` page; no reconstructed page links directly to the original Peakwood website.
- All reconstructed content links stay inside this local rebuild; external destinations are limited to the verified resident portal, application system, telephone, and map services.
- The neighborhood link remains an intentional in-page jump to the mockup’s location band; the map uses the verified Peakwood address.
- Telephone and contact-form links are wired; no unpublished email or social URL is fabricated.
- No invalid internal hash links remain.
- Updated desktop evidence: `C:\Users\chris\Desktop\IconPeakwood\qa-main-preview-updated.png`.
- Separate floor-plan page evidence: `C:\Users\chris\Desktop\IconPeakwood\qa-floorplans-preview.png`.
- Dialog evidence: `C:\Users\chris\Desktop\IconPeakwood\qa-amenities-modal.png` and `C:\Users\chris\Desktop\IconPeakwood\qa-gallery-modal.png`.
- Maintenance page evidence: `C:\Users\chris\Desktop\IconPeakwood\qa-maintenance-local-desktop.png` and `C:\Users\chris\Desktop\IconPeakwood\qa-maintenance-local-mobile.png`.
- Maintenance portal resident evidence: local desktop and mobile states reviewed at `/maintenance-portal`.
- Maintenance portal staff evidence: local desktop and mobile states reviewed through the `STAFF DASHBOARD` view.
- Maintenance portal flow: resident request submission created a tracked `IP-####` item, surfaced it in the staff queue, and staff status plus internal-note updates persisted in browser storage.
- Maintenance portal responsive check: desktop two-column resident/staff layouts and mobile stacked layouts render without horizontal overflow; the final 390px viewport measured 375px document width.
- Maintenance portal security boundary: the public resident route remains open, while `/maintenance-portal/staff` presents a private staff login gate; local preview credentials are `admin` / `admin`.
- Maintenance portal staffing workflow: staff can add maintenance members, teams, and contractors to a local directory and assign any directory entry to a request; the expanded directory was rechecked on mobile with no horizontal overflow.
- Maintenance portal directory controls: each assignee now has a remove action; removal is blocked with a clear warning while active requests remain assigned, and the directory controls were verified at the 390px mobile viewport.
- Maintenance portal contact details: clicking any directory card opens a detail panel with phone, email, specialty, active/total assignment counts, and assignment history; new directory entries accept email, and existing seeded records backfill their preview contact details without overwriting saved edits.
- A fresh preview session reported no console warnings or errors.

## Validation

- `npm run build` passed.
- `npm run test:sites` passed: 4 tests, 4 passed.
- Maintenance portal runtime QA passed: resident form, request confirmation, staff queue, filters, status updates, assignee updates, internal notes, and mobile overflow checks.
- Staff access QA passed: protected-route login, sign-out state, assignee directory add flow, assignment dropdown refresh, public resident route availability, and mobile directory layout.
- Assignee removal QA passed: remove actions render for directory entries, active-assignment safeguards fire correctly, and mobile removal controls stay within the viewport.
- Assignee contact QA passed: the Peakwood Plumbing Co. card opened its detail panel with working `tel:` and `mailto:` links, assignment history, and a mobile document width of 375px at a 390px viewport.
- Neighborhood QA passed: the main location block and NEIGHBORHOOD photo card open a four-destination popup with direction links for HCA Houston Healthcare Northwest, Lone Star College–North Harris, Willowbrook Mall, and the FM 1960 / North Houston area; the mobile modal keeps its document width at the viewport width.
- P3 follow-up: the mockup’s decorative geometric corner artwork is intentionally omitted so the right-hand statement panel stays focused on the Peakwood brand mark and message. This does not block the layout, color, responsive, or interaction result.

final result: passed
