import { useQuery } from '@tanstack/react-query';

import { getRates } from '@/api';
import type { CurrencySelectionState, RateInfo } from '@/types';

export function useRates(selectedCurrencies: CurrencySelectionState) {
    const currenciesKey = Object.values(selectedCurrencies || {}).sort();

    return useQuery<RateInfo>({
        queryKey: ['rates', ...currenciesKey],
        queryFn: async () =>
            getRates(selectedCurrencies?.source, selectedCurrencies?.target),
        enabled: Boolean(selectedCurrencies),
    });
}
