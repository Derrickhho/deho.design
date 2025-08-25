# deho.design - Derrick Ho's Portfolio

A modern, interactive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a macOS Finder-inspired interface with smooth animations and dark/light theme support.

## 🚀 Features

- **Finder-inspired Interface**: macOS-style file browser navigation
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Animations**: Smooth hover effects and transitions
- **Lottie Animations**: Engaging icon animations
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Lottie (for icons)
- **Icons**: Lucide React
- **UI Components**: Custom component library with Radix UI primitives

## 📁 Project Structure

```
deho.design/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   └── ...                # Feature-specific components
├── content/               # Content data and configuration
├── context/               # React context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
├── styles/                # Global styles
├── theme/                 # Theme configuration
└── types/                 # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/deho.design.git
   cd deho.design
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Adding Content

Content is managed in `content/portfolio-content.tsx`. You can:

- Add new folders and files
- Update existing content
- Modify URLs and links
- Add new content types

### Theming

Themes are configured in `theme/default-theme.ts`. You can:

- Modify colors for light and dark modes
- Adjust typography settings
- Customize component-specific styles

### Styling

The project uses Tailwind CSS with custom configurations in `tailwind.config.ts`.

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Deploy Options

#### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

#### Netlify
1. Build the project
2. Deploy the `out` directory
3. Configure build settings

#### Other Platforms
The project can be deployed to any platform that supports Next.js static exports.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Derrick Ho**
- Portfolio: [deho.design](https://deho.design)
- LinkedIn: [linkedin.com/in/derrickhho](https://linkedin.com/in/derrickhho)
- Twitter: [@derrickhho](https://twitter.com/derrickhho)

---

Built with ❤️ using Next.js and TypeScript
