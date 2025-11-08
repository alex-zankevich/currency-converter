import { useQuery } from '@tanstack/react-query';

import { getRates } from '@/api';
import type { CurrencySelectionState, RateInfo } from '@/types';


export function useRates(selectedCurrencies: CurrencySelectionState | null) {
    return useQuery<RateInfo>({
        queryKey: ['rates', selectedCurrencies],
        queryFn: async () =>
            getRates(selectedCurrencies?.source, selectedCurrencies?.target),
        enabled: Boolean(selectedCurrencies),
    });
}
