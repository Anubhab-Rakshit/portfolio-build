# macOS Sequoia Portfolio 

A pixel-perfect, interactive macOS Sequoia-inspired portfolio built with **Next.js 15**, **React 19**, and **Framer Motion**. This project showcases my work, skills, and experience through a fully functional operating system interface right in your browser.

> [!TIP]
> **Try the Shortcuts!**
> - **`⌘ + K`** or **`Ctrl + K`**: Open Spotlight Search
> - **`Space`**: Quick Look on any project in Finder
> - **Konami Code**: `↑ ↑ ↓ ↓ ← → ← → B A` (Try it on the Desktop!)

---

## 📸 Screenshots

<div align="center">
  <img src="/public/portfolio-readme-1.png" alt="Desktop Overview" width="800">
  <p><em>The main Desktop environment featuring interactive Widgets and the dynamic Dock.</em></p>
</div>

<br>

<div align="center">
  <table border="0">
    <tr>
      <td><img src="/public/portfolio-readme-2.png" alt="Finder and Terminal" width="400"></td>
      <td><img src="/public/portfolio-readme-3.png" alt="System Settings + Search" width="400"></td>
      <td><img src="/public/portfolio-readme-4.png" alt="Project Hub" width="400"></td>
    </tr>
    <tr>
      <td align="center"><b>Finder and Terminal</b></td>
      <td align="center"><b>System Settings and Search</b></td>
      <td align="center"><b>Project Hub</b></td>
    </tr>
  </table>
</div>

---

## ✨ Features

### 🖥️ Desktop Environment
- **Sequoia Redesign:** Frosted glass effects, dynamic MenuBar, and a redesigned Control Center.
- **Window Management:** Draggable, resizable, and minimizable windows with smooth standard macOS spring physics.
- **Genie Effect:** Authentic "Genie" minimize animation to the Dock.
- **Interactive Widgets:** Live analog clock and a functional Calendar widget on the desktop.

### 🚀 Functional Apps
- **📂 About Me (Finder):** Browse my resume, certificates, and achievements in a classic Finder layout.
- **🏪 Project Hub (App Store):** Explore my featured projects with detailed pages and gallery views.
- **📝 Define Me (Notes):** A dedicated space for my bio, career goals, and technical philosophy.
- **✉️ Mail:** Contact me directly through a fully functional Mail client interface.
- **🧭 Safari:** Read my technical blogs or browse internal/external links without leaving the "OS".
- **💻 Terminal:** A custom-built, interactive shell with `neofetch`, file system Simulation, and 20+ commands.
- **📸 Photos:** View my photography, certificates, and hobby clips in an Apple-style gallery.

### 🔋 System Intelligence
- **Spotlight Search:** Global search across projects, sections, and commands.
- **Control Center:** Toggle Dark Mode, adjust brightness, and control background music (Perfect - Ed Sheeran).
- **Dynamic Battery:** Real-time battery status and health monitoring directly from your browser.
- **Responsive Design:** Seamlessly transitions to an **iOS-style Home Screen** on mobile devices.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://reactjs.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/)

---

## 🏃 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS version)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anubhab-Rakshit/portfolio-build.git
   cd portfolio-build
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📁 Project Structure

```text
├── app/               # Next.js App Router (Pages & Layout)
├── components/        # Reusable UI components
│   ├── apps/          # Individual windowed applications
│   ├── desktop/       # Desktop shell, icons, and widgets
│   ├── dock/          # Floating dock with magnification
│   ├── menubar/       # Top system menu bar
│   └── window/        # Core window management (DraggableWindow)
├── contexts/          # Global state (WindowContext, ThemeContext)
├── hooks/             # Custom system hooks
├── lib/               # Portfolio data and utility functions
├── public/            # Static assets (Images, Icons, Resume)
└── styles/            # Global CSS / Tailwind configurations
```

---

## 📞 Contact

- **Name:** Anubhab Rakshit
- **Email:** [coder.anubhab26@gmail.com](mailto:coder.anubhab26@gmail.com)
- **LinkedIn:** [in/anubhab-rakshit](https://www.linkedin.com/in/anubhab-rakshit/)
- **Website:** [anubhabrakshit.com](https://anubhabrakshit.com)

---

<p align="center">
  Built with ❤️ by Anubhab Rakshit
</p>
