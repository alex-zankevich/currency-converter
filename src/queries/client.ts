import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryCache, QueryClient } from '@tanstack/react-query';

import { useToastStore } from '@/stores';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
        },
    },
    queryCache: new QueryCache({
        onError: (error: Error) => {
            if (!error.message) return;

            useToastStore
                .getState()
                .addToast({ type: 'error', message: error.message });
        },
    }),
});

export const persister = createSyncStoragePersister({
    storage: window.localStorage,
});
