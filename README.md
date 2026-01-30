# Blitz Messaging App Landing Page
Landing website page for Blitz Messaging application for Milima Technologies.

# Overview
This landing page is focused on:
Presenting the platform clearly and professionally.
Highlighting key features offered by the application through engaging visuals and descriptive sections.
Encouraging user interaction by use of CTA buttons.
Providing <u>email intergration</u> for inquiries via <b>Email.Js</b>
Fully responsive experience across mobile, tablets, and desktop devices.



# Key Sections


1. Navigation and Header - Sticky navigation
2. Carousel / Hero section with primary CTA <b>(Download now)</b>
3. Features Section.
4. Platform CTA Section.
5. Footer with social links and contact details.( email, phone number, socials)
6. Email intergration (Use of <b>Email.Js</b>)
7. Responsiveness. (Mobile-first, table & desktop)

# Requirements

1. Modern web browser support (chrome, firefox, edge, opera, safari)
2. Email.js account ( for form functionality)
3. Hosting platform
4. Optional: SSL Certificate for secure email delivery and HTTPS


Non-functional requirements.
1. Clean UI with data security theme.
2. Fast page load
3. Accessibility considerations.

# Approach

1. Design

Review  messaging templates for inspiration.
Cohesive color scheme and topography
Sketch layout => header, carousel, features, CTA, footer.

Single-page layout, multi section layout ( tailored for onboarding )
Visual hierarchy, clear CTAs.


2. Development

Framework => HTML, CSS, JS, React
Header => Navigation + Logo
Carousel => Slides + CTA buttons
Features => Cards / images with description
CTA Section => Action prompt (donwload now)
Footer => Socials, contact, location

Build re-usable components for <b> Header, Carousel features, CTA, Footer. </b>

Intergrate Email.Js for the contact form.
Form fields: Name, Phone number, Email, Message
Validation & confirmation notification.

3. Testing
Check responsiveness on different devices
Test email functionality thoroughly (email.js intergration)
Test browser compatibility

4. Deployment
Host on preferred platform (client-sided)
Email functionality is live.

# Project Structure

Quick breakdown of how the project is structured, how routing works, and how we showcase everything on the frontend.

### The Entry Point
Everything starts at `src/main.tsx`. Wrap the app in a `QueryClientProvider` (for any future API work) and kick off the `RouterProvider`.

### Routing (`src/router.tsx`)
Using React Router's `createBrowserRouter`. 
- The base path (`/`) is wrapped in `MainLayout`.
- Use **lazy loading** for the `HomePage`. Helps to keeps the initial bundle size small—the browser only grabs the home page code when it actually needs it.

### The Frame (`src/components/MainLayout.tsx`)
Ensures `Header` and `Footer` are always visible. The `<Outlet />` is a placeholder where whatever page you're visiting gets injected.

### Component System
The `HomePage.tsx` is just a coordinator that pulls in individual sections from the `src/components/` folder:

- **Interactive stuff**: Most animations are inside `HeroAnimations.tsx`. 
- **The Grids**: `Features.tsx` handles main value props and 
- **The Modal**: `Contact.tsx` handles lead gen form via EmailJS intergration.

### Tech Stack / Styling
- **Tailwind CSS**: For all the styling. Global tokens (like colors and blur effects) live in `src/index.css`.
- **Framer Motion**: For animations (fades, slides of the modals).
- **Iconify**: For icons without bloating the project with SVG files.
