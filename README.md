# Prooffolio 💼✨
> **Freemium Portfolio Builder & Professional Resume Studio for Developers & Creatives**  
> Built with strict **₹0 additional budget** &bull; Zero Server Lock-in &bull; Standalone Static Export &bull; Vector A4 PDF Generation &bull; Cloudflare Pages Ready.

---

## 🌟 Overview
**Prooffolio** is an all-in-one personal branding suite enabling developers, designers, and creators to design, preview, and export high-converting web portfolios **and** professional ATS-conscious PDF resumes in minutes.

Everything runs entirely in your browser with **zero backend infrastructure, zero paid API keys, zero paid hosting, and zero subscriptions**.

---

## 🚀 Key Features

### 1. Polished Landing Page & Mobile-Responsive Design
- **Mobile-First Responsiveness**: Fully responsive layout verified down to 320px/375px/390px mobile viewports with zero horizontal overflow.
- **Mobile Navigation Drawer**: Smooth slide-in menu with fast navigation to template gallery, features, pricing, and 1-click ATS resume builder.
- **Interactive FAQ Accordion**: Expandable Q&A explaining the ₹0 budget model, LocalStorage privacy, and export formats.
- **Handcrafted Template Gallery (All 7 Preserved)**:
  - **4 Free Usable Templates**:
    - **Modern Bento**: SaaS card grid with glassmorphism, stats counters, and gradient accents.
    - **Developer Terminal**: Code-first monospace aesthetic (`JetBrains Mono`), terminal prompts, and git commit history timeline.
    - **Minimal Elegance**: Ultra-clean monochrome editorial layout with subtle serif/sans interplay.
    - **Creative Studio**: Expressive, bold layout (`Space Grotesk`) with vivid accent pops and visual card reveals.
  - **3 Premium Previews**:
    - **Executive 3D Showcase**, **Studio Agency X**, and **Cyberpunk 2077 HUD** with honest roadmap evaluation modals.

### 2. Direct Profile Photo & Project Cover Image Uploads
- **Client-Side Optimization Engine (`imageOptimizer.ts`)**:
  - Accepts JPG, JPEG, PNG, and WebP files up to 8MB.
  - Client-side canvas resizing:
    - **Avatar**: Scaled to 400×400px square.
    - **Project Covers**: Scaled to 960×540px (16:9 video aspect ratio).
  - WebP conversion at 82% quality (shrinks 4MB+ raw photos down to ~25KB–45KB base64 strings).
  - Instant image preview, file dimension validation, replacement, and removal.
  - Retains URL input fallback for users who prefer remote links.
- **LocalStorage Quota Protection (`storage.ts`)**:
  - Safe quota detection (`QuotaExceededError`) with user-friendly alerts.
  - Storage usage tracker (`getStorageUsage()`).
  - Validation of base64 data URLs during JSON backup restore.
- **Export Compatibility (`exporter.ts`)**:
  - **Static Website ZIP**: Unpacks base64 image data into real binary assets (`assets/avatar.webp`, `assets/project-0.webp`) with clean relative paths.
  - **Standalone Single HTML**: Inlines data URLs for 100% portable, offline-viewable files.

### 3. Professional Resume Builder & Studio (5 Distinct Layouts)
- **Automatic Data Mapping**: Intelligently transforms your portfolio profile, work experience, education, skills, and projects into print-ready A4 resumes.
- **5 Genuine Templates**:
  - **ATS Professional**: Single-column, black & white, standard typography (`Times`/`Helvetica`), clear ATS-oriented headings, maximum machine readability.
  - **Modern Tech**: Developer-tailored layout with navy accents, technical skill chips, and project links.
  - **Minimal Monochrome**: High whitespace, clean typography, numbered sections, subtle dividers.
  - **Fresh Graduate**: Prioritizes Education, Honors, and Academic Projects above work experience.
  - **Executive Leadership**: Two-column layout with a left sidebar for competencies and a wide column for leadership roles.
- **Customization & Section Manager**:
  - Custom headline and executive summary overrides.
  - Accent color picker and photo toggle.
  - Section reordering (Up/Down arrows) and visibility toggles (Eye icons).
- **Client-Side Vector Text A4 PDF Export (`pdfGenerator.ts`)**:
  - Direct PDF generation via `jspdf`.
  - **100% Selectable Vector Text** (not blurry rasterized screenshots).
  - Automatic page breaks with safe margin calculations.
  - Clickable hyperlinks for email, portfolio, and GitHub projects.
  - Tiny PDF file sizes (~15KB) with instantaneous client-side download.

### 4. Real-Time Visual Editor
- **Live Preview Canvas**: Instant visual feedback on every keystroke.
- **Responsive Viewport Frames**: 1-click preview switching between **Desktop (100%)**, **Tablet (768px)**, and **Mobile (390px)**.
- **Mobile Editor Mode**: Fast toggle between "Editor" form controls and "Preview" pane on smartphones.
- **Complete Section Suite**: Profile, Bio, Themes & Colors, Projects, Experience, Skills, Education, and Contact.
- **Autosave & Persistence**: Debounced background autosave, explicit manual save, JSON backup download & restore, and "Delete All Local Data" privacy action.

---

## 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) (Vector text A4 PDF engine)
- **ZIP Packaging**: [JSZip](https://stuk.github.io/jszip/) (Binary asset extractor & static site bundler)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Brand Icons
- **Storage**: Client-side `localStorage` with quota protection

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js (v18 or higher recommended; verified on Node v24)
- npm (v9 or higher)

### Installation
```bash
# Clone or navigate to the project directory
cd "c:\Users\gvtas\new project"

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your browser.

### Production Build
```bash
# Type check and compile production bundle
npm run build
```
The compiled, optimized production files are output to the `dist/` directory.

---

## 🌐 Deploying to Cloudflare Pages (₹0 Free Plan)

You can host both the **Prooffolio application itself** and **any individual exported portfolio** on Cloudflare Pages with **zero hosting cost** and free global SSL.

### Method 1: Direct Drag & Drop (Fastest &bull; 60 seconds)
1. Run the production build:
   ```bash
   npm run build
   ```
2. Log in to your free [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. In the left navigation, click **Workers & Pages**.
4. Click **Create application** &rarr; **Pages** &rarr; **Upload assets**.
5. Give your project a name (e.g., `prooffolio-builder` or `<your-name>-portfolio`).
6. Drag and drop the `dist/` folder (for the app) or the extracted exported portfolio folder (for your exported site).
7. Click **Deploy site**.
8. Your site will instantly be live at:
   ```
   https://<your-project-name>.pages.dev
   ```

### Method 2: Connect via GitHub (Automatic Git CI/CD)
1. Push this repository to GitHub.
2. In Cloudflare Pages, select **Connect to Git** &rarr; Choose your repository.
3. Configure the build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**. Cloudflare Pages will automatically rebuild and deploy on every git push!

---

## 🔒 Security & Privacy Principles
- **Strict ₹0 Budget Guarantee**: No paid hosting, no external database accounts, and no paid API keys required.
- **Zero Backend Secrets**: No API keys, credentials, or secrets stored in client-side code.
- **Untrusted Input Sanitization**: All user-provided fields (names, URLs, bios) are strictly escaped and sanitized. Protocols other than `http:`, `https:`, `mailto:`, `tel:`, and safe base64 image data URLs are rejected to prevent XSS.
- **Local-First Privacy**: Your profile content and uploaded images stay strictly in your local browser storage. An explicit "Delete All Local Data" button allows complete erasure at any time.

---

## 📊 Verification Checklist
- [x] Profile avatar upload with instant preview, canvas WebP compression, and URL fallback.
- [x] Project cover image upload with 16:9 aspect ratio, preview, and fallback UI.
- [x] LocalStorage quota error handling and data URL validation upon JSON restore.
- [x] Export static ZIP extracts base64 images into real binary files in `assets/`.
- [x] Mobile responsiveness verified on 320px, 375px, and 390px viewports.
- [x] Mobile drawer navigation menu with smooth toggle.
- [x] Interactive FAQ accordion with expand/collapse states.
- [x] Mobile visual editor with Form/Preview split toggle.
- [x] 5 professional resume templates with live preview.
- [x] Resume overrides (headline, summary, accent color, photo toggle).
- [x] Resume section reordering and visibility management.
- [x] Selectable vector text A4 PDF download via `jspdf`.
- [x] Production build (`npm run build`) compiles with zero errors.
