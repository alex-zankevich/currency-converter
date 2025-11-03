import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getRates } from '@/api';
import type { CurrencySelectionState, RateInfo } from '@/types';

export interface UseRatesProps {
    selectedCurrencies: CurrencySelectionState;
}

export function useRates({ selectedCurrencies }: UseRatesProps) {
    const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState(0);
    const {
        data: rates,
        isFetching: isRatesFetching,
        refetch,
    } = useQuery<RateInfo>({
        queryKey: ['rates', selectedCurrencies],
        queryFn: async () =>
            getRates(selectedCurrencies.source, selectedCurrencies.target),
    });

    useEffect(() => {
        if (rates) {
            setLastUpdatedTimestamp(Date.now());
        }
    }, [rates]);

    return {
        ...rates,
        lastUpdatedTimestamp,
        isRatesFetching,
        refetchRates: refetch,
    };
}
