# Currency Converter

This single-page application provides real-time currency conversion with offline support, and a responsive design.

## 🌐 Live Demo Links

- **Main**: [https://www.alexzankevich.com/](https://www.alexzankevich.com/)
- **Vercel**: [https://currency-converter-rosy-five.vercel.app/](https://currency-converter-rosy-five.vercel.app/)

## 🚀 Quick Start

### Installation & Development

1. Clone the repository:

```bash
git clone https://github.com/alex-zankevich/currency-converter.git
cd currency-converter
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier and fix ESLint issues

## 🏗️ Project Architecture

### Tech Stack

#### Core Technologies

- **React 19** - Latest React version with improved performance via React Compiler, eliminating the need for manual optimizations like `React.memo`, `useMemo`, and `useCallback`
- **TypeScript** - Type safety and enhanced developer experience
- **Tailwind CSS v4** - Utility-first CSS framework that works well for implementing the provided design
- **Vite** - Fast build tool with excellent developer experience

#### State Management & Data Fetching

- **Zustand** - Lightweight state management solution that serves as a good alternative to React Context API. Alternatives like Redux/MobX would be overkill for this application. It also supports persisting state in `localStorage`, eliminating the need for a custom solution.

- **TanStack Query (React Query)** - Powerful library that simplifies API communication and state management using its caching mechanism. While the package size is not minimal for this application, the benefits and convenience it provides outweigh any drawbacks. It also supports persisting state in `localStorage` via `@tanstack/react-query-persist-client`.

#### Utility Libraries

- **clsx + tailwind-merge** - Efficient className management
- **Intl.NumberFormat** - Localisation for numbers

### Project Structure

```
currency-converter/
├── src/
│   ├── api/            # API integration (fxratesapi.com)
│   ├── assets/         # SVG icons
│   ├── components/     # Core app building blocks
│   ├── hooks/          # Custom reusable hooks
│   ├── lib/            # Utility functions (conversion, formatting)
│   ├── queries/        # TanStack Queries
│   ├── stores/         # Zustand state management
│   ├── types/          # TypeScript definitions
│   ├── ui/             # Reusable UI components
│   └── main.tsx        # App entry point
└── package.json        # Dependencies and scripts
```

### Key Architecture Decisions

#### 1. API Choice: fxratesapi.com

- Provides all necessary information (currency list with name, code, symbol data; rates data with ability to set base currency) to implement requirements
- Supports base currency selection for accurate conversions
- Does not require an API key for accessing necessary free endpoints

#### 2. Caching Strategy

- **TanStack Query** handles caching with persistence to localStorage
- Cache invalidation: 5 minutes
- Background refetch when online
- Stale-while-revalidate pattern for instant UI updates

#### 3. Conversion Formula

When API uses a base currency (e.g., USD), conversion between any two currencies follows:

```
rate(A → B) = rate(Base → B) / rate(Base → A)
```

#### 4. Performance Optimizations

- **Debouncing**: 250ms debounce on input and refresh rates button to prevent excessive API calls
- **Memoization**: `useMemo` for some expensive calculations (React Compiler handles most memoization)
- **Code Splitting**: Lazy loading for some components using `React.lazy` (e.g., currency selector modal content)

#### 5. State Management Strategy

- **Zustand** for application state
- **TanStack Query** for server data state
- **localStorage** for persistence (last used values, cached rates and currencies)

#### 6. Error Handling

- Network errors show messages via toast notifications
- Offline state gracefully falls back to cached data
- Failed conversions display error message
- `ErrorBoundary` for any unexpected application errors

## 📝 Code Quality & Configuration

- **Strict TypeScript** with full type coverage for API responses and domain logic
- **ESLint + Prettier** for code formatting and linting
- **Clean Code Principles** following SOLID, KISS, DRY, and YAGNI
