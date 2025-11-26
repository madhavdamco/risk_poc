# RiskSense — Redington Demo

A proof-of-concept enterprise risk intelligence platform built for Redington. This application demonstrates comprehensive risk assessment capabilities across multiple domains including Cyber, Geopolitical, Supply Chain, Financial, and Operational risks.

## Features

- **Multi-Category Risk Assessment**: Analyze risks across 5 major categories
- **Interactive Data Sources**: View and access data sources for each risk category
- **Simulated Analysis Flow**: Realistic 3-5 second analysis with progress indicators
- **Flexible Filtering**: Analyze all categories or select specific ones
- **Real-time Results**: View detailed risk items with scores and severity ratings
- **Export Functionality**: Download assessment results as CSV
- **Responsive Design**: Mobile-friendly interface with professional styling

## Quick Start

### Prerequisites
- Node.js 16+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.tsx     # Top navigation with Redington branding
│   ├── Footer.tsx     # Footer with demo notice
│   ├── CategoryAccordion.tsx  # Risk category cards with data sources
│   ├── LoadingAnimation.tsx   # Analysis loading screen
│   └── RiskCard.tsx   # Individual risk item display
├── data/
│   └── riskData.ts    # Hard-coded risk data and categories
├── pages/
│   ├── Overview.tsx   # Main landing page with categories
│   ├── Analyze.tsx    # Analysis loading page
│   ├── Results.tsx    # Results dashboard
│   └── About.tsx      # Platform information
└── App.tsx            # Main application with routing
```

## Demo Script

For client demonstrations, follow this simple flow:

1. **Overview Page**: 
   - Show the 5 risk categories
   - Expand accordions to display data sources
   - Either select specific categories or proceed with all

2. **Analysis**:
   - Click "Analyze All Risks" or "Analyze [X] Selected Categories"
   - Watch the simulated loading sequence (3-5 seconds)

3. **Results**:
   - Review the dashboard with summary metrics
   - Browse risk items organized by category
   - Sort by risk score (ascending/descending)
   - Export results to CSV

## Branding

### Redington Logo

The application includes Redington branding in the header. If you need to replace the logo:

1. Place your logo file in `/public/` directory (e.g., `redington-logo.svg` or `redington-logo.png`)
2. Update the logo reference in `src/components/Header.tsx`

Current implementation uses a styled shield icon with Redington's green brand color (#00A651).

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **shadcn/ui** component library
- **Lucide React** for icons

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite configuration
5. Click "Deploy"

Your app will be live with a production URL.

### Alternative Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains your production files
# Upload to any static hosting service (Netlify, AWS S3, etc.)
```

## Development Notes

- All risk data is hard-coded in `src/data/riskData.ts`
- No external API calls are made (this is a demo)
- Analysis is simulated with timers
- Export functionality generates CSV from in-memory data

## Customization

### Adding New Risk Items

Edit `src/data/riskData.ts` and add items to the appropriate category:

```typescript
{
  id: "CYB-004",
  title: "New Risk Title",
  score: 65,
  severity: "Medium-High",
  description: "Risk description",
  category: "cyber",
}
```

### Modifying Data Sources

Update the `dataSources` array in any category within `src/data/riskData.ts`:

```typescript
dataSources: [
  { name: "Source Name", url: "https://example.com" }
]
```

### Styling

The design system is defined in:
- `src/index.css` - CSS variables and theme tokens
- `tailwind.config.ts` - Tailwind configuration

Primary brand color (Redington green) is defined as:
```css
--primary: 145 73% 32%;
```

## License

This is a demo application built for Redington. Not for production use.

## Support

For questions or issues, please refer to the project documentation or contact the development team.
