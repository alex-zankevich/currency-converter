import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { persister, queryClient } from '@/queries';

import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorPage } from './components/ErrorPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister, maxAge: 5 * 60 * 1000 }}
        >
            <ErrorBoundary fallback={<ErrorPage />}>
                <App />
            </ErrorBoundary>
        </PersistQueryClientProvider>
    </StrictMode>,
);
