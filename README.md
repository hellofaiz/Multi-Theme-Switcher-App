# Multi-Theme Switcher App


## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```


## 🛠 Technology Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **React Router** - Client-side routing
- **Vite** - Fast build tool and development server
- **FakeStore API** - External API for product data

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Fixed header with theme switcher
│   ├── Layout.tsx      # Main layout wrapper
│   └── Navigation.tsx  # Navigation component
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Theme management context
├── pages/              # Page components
│   ├── Home.tsx        # Home page with products
│   ├── About.tsx       # About page
│   └── Contact.tsx     # Contact form page
├── utils/              # Utility functions
│   └── security.ts     # Security utilities
├── App.tsx             # Main app component
└── main.tsx           # App entry point
```
