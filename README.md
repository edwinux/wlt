# Wallet.app Homepage

A modern cryptocurrency wallet homepage built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌙 Dark theme with glassmorphism design
- 📊 Interactive balance chart using Recharts
- 💰 Cryptocurrency assets grid
- 📈 Real-time activity tracking
- 🎨 Modern UI with hover effects and transitions
- 📱 Responsive design with mobile-specific views
- 🔐 Complete authentication flow (Welcome, Confirmation Code, 2FA Setup)

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
│   ├── globals.css        # Global styles and theme
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage component
│   └── auth/              # Authentication pages
│       ├── welcome/       # Login/signup welcome screen
│       ├── confirm/       # Email/SMS confirmation code
│       └── 2fa-setup/     # Two-factor authentication setup
├── public/                # Static assets
└── package.json           # Dependencies
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

### Homepage Features:

1. **Header**: Navigation menu with wallet actions
2. **Balance Section**: Total balance display with trend chart
3. **Assets Grid**: Visual representation of cryptocurrency holdings
4. **Activity Table**: Recent transactions and trades
5. **Apps Sidebar**: Additional wallet features and services
6. **Price Cards**: Real-time price displays for major cryptocurrencies

### Authentication Flow:

1. **Welcome Screen** (`/auth/welcome`): 
   - Email/phone input
   - Social login options (Google, Apple, Discord, FIX ID, GitHub, Twitter, LinkedIn)
   - Expandable "More options" for additional providers
   
2. **Confirmation Code** (`/auth/confirm`): 
   - 5-digit verification code input
   - Mobile-optimized numeric keypad
   - Auto-advance and smart backspace handling
   - Visual feedback for active input position
   
3. **Success Screen** (`/auth/success`):
   - Animated checkmark confirmation
   - Auto-redirect after 2 seconds
   
4. **2FA Setup** (`/auth/2fa-setup`): 
   - Optional two-factor authentication setup
   - Skip option for later configuration

### Mobile Features:

- Bottom navigation bar
- Modal screens for assets, activity, and apps
- Touch-optimized UI elements
- Responsive layouts for all screen sizes

### Authentication State Management:

- **Logged Out State**: Shows "Log in" button in header and welcome message
- **Logged In State**: Shows user avatar with dropdown menu containing:
  - Profile
  - Wallet Settings
  - Security
  - Payment Methods
  - General Settings
  - Log out (red text)
- **Persistent State**: Uses localStorage to maintain auth state across page refreshes
- **Simulated Login**: Authentication flow automatically logs in user after confirmation

## License

MIT
