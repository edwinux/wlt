# Wallet.app Homepage

A modern cryptocurrency wallet homepage built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌙 Dark theme with glassmorphism design
- 📊 Interactive balance chart using Recharts
- 💰 Cryptocurrency assets grid
- 📈 Real-time activity tracking
- 🎨 Modern UI with hover effects and transitions
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Charts**: Recharts
- **UI**: Custom glassmorphism components

## Project Structure

```
wallet-app/
├── app/
│   ├── globals.css    # Global styles and theme
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Homepage component
├── public/            # Static assets
└── package.json       # Dependencies
```

## Customization

### Theme Colors

The dark theme colors are defined in `app/globals.css`. You can customize the color palette by modifying the CSS variables:

```css
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 251 91% 66%;
  /* ... */
}
```

### Adding New Assets

To add new cryptocurrency assets, update the `assets` array in `app/page.tsx`:

```typescript
const assets = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "bg-orange-500" },
  // Add new assets here
];
```

## Development

The homepage includes:

1. **Header**: Navigation menu with wallet actions
2. **Balance Section**: Total balance display with trend chart
3. **Assets Grid**: Visual representation of cryptocurrency holdings
4. **Activity Table**: Recent transactions and trades
5. **Apps Sidebar**: Additional wallet features and services
6. **Price Cards**: Real-time price displays for major cryptocurrencies

## License

MIT
