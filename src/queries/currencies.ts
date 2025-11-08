import { useQuery } from '@tanstack/react-query';

import { getCurrencies } from '@/api';

export function useCurrencies() {
    return useQuery({
        queryKey: ['currencies'],
        queryFn: async () => getCurrencies(),
    });
}
