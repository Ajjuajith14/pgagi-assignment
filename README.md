### Analytics Dashboard

A comprehensive, real-time data visualization platform built with Next.js, featuring multiple API integrations, responsive design, and customizable widgets.





## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)



- [Usage Guide](#usage-guide)

- [Authentication](#authentication)
- [Dashboard Navigation](#dashboard-navigation)
- [Widget Functionality](#widget-functionality)
- [Customization Options](#customization-options)



- [API Integrations](#api-integrations)
- [Deployment](#deployment)

- [Git Setup](#git-setup)
- [Netlify Deployment](#netlify-deployment)



- [Development Journey](#development-journey)
- [Known Limitations](#known-limitations)
- [Future Enhancements](#future-enhancements)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)


## Overview

The Analytics Dashboard is a modern web application designed to provide users with a centralized platform for monitoring various data sources in real-time. It combines weather information, financial data, news updates, and performance metrics in a single, user-friendly interface.

This project demonstrates the implementation of a responsive, widget-based dashboard using modern web technologies and best practices. It's suitable for businesses, analysts, or individuals who need to track multiple data sources simultaneously.

## Features

- **Intuitive Dashboard Interface**: Clean, modern design with easy navigation
- **Responsive Layout**: Fully functional across desktop, tablet, and mobile devices
- **Multiple Data Widgets**:

- **Weather Widget**: Real-time weather conditions and forecasts
- **Stock Market Widget**: Financial data and market trends
- **News Widget**: Latest news with keyword search functionality
- **Performance Metrics**: Interactive charts displaying key metrics
- **Activity Feed**: Chronological list of recent activities



- **Theme Options**: Toggle between light and dark modes
- **User Authentication**: Secure login system with demo access
- **Real-time Data**: Live updates from multiple external APIs
- **Search Capability**: Find specific news articles by keyword
- **Data Visualization**: Interactive charts and graphs


## Demo

Experience the live dashboard: [Analytics Dashboard Demo](https://analytics-dashboard-demo.netlify.app)

Demo Credentials:

- **Email**: [demo@example.com](mailto:demo@example.com)
- **Password**: demo123


## Technology Stack

This project leverages modern web technologies to deliver a seamless user experience:

- **Frontend Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling Solution**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**:

- [React Query](https://tanstack.com/query/latest) for server state
- React Context for UI state



- **Data Visualization**: [Recharts](https://recharts.org/)
- **External APIs**:

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Alpha Vantage](https://www.alphavantage.co/) for financial data
- [News API](https://newsapi.org/) for news articles



- **Deployment Platform**: [Netlify](https://www.netlify.com/)


## Project Structure

The project follows a modular, component-based architecture:

```plaintext
analytics-dashboard/
├── app/                    # Next.js App Router structure
│   ├── api/                # API routes for backend functionality
│   │   ├── news/           # News API endpoint
│   │   ├── stocks/         # Stock market API endpoint
│   │   └── weather/        # Weather API endpoint
│   ├── auth/               # Authentication-related pages
│   │   ├── signin/         # Login page
│   │   └── signup/         # Registration page
│   ├── dashboard/          # Dashboard pages and layouts
│   │   └── page.tsx        # Main dashboard page
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Homepage
├── components/             # Reusable React components
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── navbar.tsx      # Top navigation bar
│   │   └── sidebar.tsx     # Side navigation menu
│   ├── ui/                 # UI components (shadcn/ui)
│   └── widgets/            # Widget components
│       ├── news-widget.tsx # News display widget
│       ├── stock-widget.tsx# Stock market widget
│       └── weather-widget.tsx # Weather information widget
├── hooks/                  # Custom React hooks
│   ├── use-auth.ts         # Authentication hook
│   └── use-theme.ts        # Theme switching hook
├── lib/                    # Utility functions and helpers
├── public/                 # Static assets
│   └── images/             # Image assets
├── services/               # API service functions
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
├── middleware.ts           # Next.js middleware for auth
├── next.config.js          # Next.js configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## Getting Started

### Prerequisites

Before setting up the project, ensure you have:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm (v8.0.0 or higher) or [Yarn](https://yarnpkg.com/)
- Git
- API keys for:

- OpenWeatherMap
- News API
- Alpha Vantage





### Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

```shellscript
git clone https://github.com/yourusername/analytics-dashboard.git
cd analytics-dashboard
```


2. **Install dependencies**:

```shellscript
npm install
# or
yarn install
```




### Environment Setup

1. **Create environment variables file**:
Create a `.env.local` file in the root directory with the following variables:

```plaintext
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_alphavantage_api_key
```

Replace `your_*_api_key` with your actual API keys.


2. **Start the development server**:

```shellscript
npm run dev
# or
yarn dev
```


3. **Access the application**:
Open [http://localhost:3000](http://localhost:3000) in your browser.


## Usage Guide

### Authentication

- **Demo Access**: Use the provided demo credentials on the sign-in page
- **Registration**: Create a new account through the sign-up page
- **Sign Out**: Click on your profile picture in the top-right corner and select "Sign Out"


### Dashboard Navigation

- **Sidebar**: Navigate between different dashboard sections
- **Top Navbar**: Access user profile, notifications, and theme toggle
- **Breadcrumbs**: Track your location within the application


### Widget Functionality

Each widget offers specific functionality:

- **Weather Widget**:

- Displays current weather conditions
- Shows temperature, humidity, wind speed, and conditions
- Provides a 5-day forecast



- **Stock Market Widget**:

- Shows stock prices and trends
- Displays daily, weekly, and monthly charts
- Allows searching for specific stock symbols



- **News Widget**:

- Presents latest news articles
- Supports keyword search
- Categorizes news by topic



- **Performance Metrics**:

- Visualizes key performance indicators
- Provides interactive charts
- Supports different time ranges





### Customization Options

- **Theme Toggle**: Switch between light and dark modes using the toggle in the navbar
- **Widget Settings**: Customize individual widgets via their settings icon
- **Layout Options**: Choose between different dashboard layouts (grid, list)


## API Integrations

The dashboard integrates with several external APIs:

### Weather Data (OpenWeatherMap)

```typescript
// Weather data is fetched through a custom API route
// Example usage in the Weather Widget
const { data, isLoading } = useWeatherQuery('London');
```

### Financial Data (Alpha Vantage)

```typescript
// Stock data is fetched through a custom API route
// Example usage in the Stock Widget
const { data, isLoading } = useStockQuery('AAPL');
```

### News Data (News API)

```typescript
// News articles are fetched through a custom API route
// Example usage in the News Widget
const { data, isLoading } = useNewsQuery('technology', 'ai');
```

## Deployment

### Git Setup

The project was version-controlled using Git:

1. **Initialize Git repository**:

```shellscript
git init
```


2. **Create .gitignore file** to exclude unnecessary files:

```plaintext
node_modules/
.next/
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
```


3. **Add files and commit**:

```shellscript
git add .
git commit -m "Initial commit: Analytics Dashboard project"
```


4. **Connect to remote repository**:

```shellscript
git remote add origin https://github.com/yourusername/analytics-dashboard.git
git push -u origin main
```




### Netlify Deployment

The project was deployed to Netlify following these steps:

1. **Create Netlify Account** at [netlify.com](https://www.netlify.com/)
2. **Connect Git Repository**:

1. From Netlify dashboard, select "Add new site" → "Import an existing project"
2. Choose your Git provider and select the repository



3. **Configure Build Settings**:

1. Build command: `npm run build`
2. Publish directory: `.next`



4. **Add Environment Variables** in Netlify's dashboard:

1. Add all required API keys



5. **Create netlify.toml Configuration**:

```plaintext
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NETLIFY_NEXT_PLUGIN_SKIP = "true"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```


6. **Install Netlify Next.js Plugin**:

```shellscript
npm install -D @netlify/plugin-nextjs
```


7. **Update next.config.js** for Netlify compatibility:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org", "newsapi.org", "alphavantage.co"],
    unoptimized: true,
  },
  target: "serverless"
}

module.exports = nextConfig
```


8. **Deploy** by pushing changes to your Git repository


## Development Journey

The Analytics Dashboard was developed through several key phases:

1. **Planning & Design**: Created wireframes and component architecture
2. **Core Framework Setup**: Initialized Next.js with TypeScript and Tailwind CSS
3. **Component Development**: Built reusable UI components
4. **Widget Implementation**: Developed individual data widgets
5. **API Integration**: Connected to external data sources
6. **Authentication**: Implemented user authentication system
7. **Responsive Design**: Ensured cross-device compatibility
8. **Testing & Refinement**: Tested functionality and fixed issues
9. **Deployment**: Pushed to Git and deployed to Netlify


## Known Limitations

- **API Rate Limits**: Free tier API keys have usage restrictions
- **Data Freshness**: Some data may be delayed due to API limitations
- **Browser Compatibility**: Optimized for modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile Experience**: While responsive, some complex visualizations work better on larger screens
- **Authentication**: Uses simplified auth for demo purposes; production would require more robust security


## Future Enhancements

Planned improvements for the project:

- **Drag-and-Drop Layout**: Allow users to rearrange widgets
- **Additional Widgets**: Calendar, tasks, and social media integrations
- **Advanced Visualizations**: More chart types and interactive elements
- **Real-time Updates**: WebSocket integration for live data
- **User Preferences**: Saved dashboard configurations
- **Data Export**: Export visualizations and reports
- **Enhanced Authentication**: OAuth and multi-factor authentication
- **Offline Support**: Progressive Web App capabilities
- **Internationalization**: Multi-language support


## Troubleshooting

### Common Issues

1. **API Data Not Loading**

1. **Symptom**: Widgets show loading state indefinitely
2. **Cause**: API key issues or rate limiting
3. **Solution**: Verify API keys in environment variables and check API usage limits



2. **Styling Inconsistencies**

1. **Symptom**: UI elements appear differently than expected
2. **Cause**: Tailwind CSS configuration issues
3. **Solution**: Check Tailwind configuration and class usage



3. **Build Errors on Netlify**

1. **Symptom**: Deployment fails
2. **Cause**: Missing dependencies or configuration issues
3. **Solution**: Check Netlify build logs and verify configuration files



4. **Authentication Issues**

1. **Symptom**: Unable to log in or access protected routes
2. **Cause**: Middleware or authentication configuration
3. **Solution**: Check authentication implementation and middleware settings





## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request


Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Recharts](https://recharts.org/) - Charting library
- [OpenWeatherMap](https://openweathermap.org/) - Weather data API
- [News API](https://newsapi.org/) - News data API
- [Alpha Vantage](https://www.alphavantage.co/) - Financial data API
- [Netlify](https://www.netlify.com/) - Deployment platform


---

**Created by [Ajju Giri]**

[GitHub](https://github.com/Ajjuajith14) | [LinkedIn](https://www.linkedin.com/in/ajju-giri-ab8214212/)]

---

*Note: Replace placeholder URLs, usernames, and API keys with your actual information.*
