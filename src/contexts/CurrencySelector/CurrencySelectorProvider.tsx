import { type PropsWithChildren, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getCurrencies } from '@/api';
import type { CurrencySelectionState } from '@/types';

import {
    CurrencySelectorContext,
    DEFAULT_SELECTED_CURRENCIES,
} from './CurrencySelectorContext';

export function CurrencySelectorProvider({ children }: PropsWithChildren) {
    const [selectedCurrencies, setSelectedCurrencies] = useState(
        DEFAULT_SELECTED_CURRENCIES,
    );

    const { data, isPending } = useQuery({
        queryKey: ['currencies'],
        queryFn: async () => getCurrencies(),
    });

    function updateSelectedCurrencies(value: Partial<CurrencySelectionState>) {
        setSelectedCurrencies({ ...selectedCurrencies, ...value });
    }

    function swapCurrencies() {
        updateSelectedCurrencies({
            source: selectedCurrencies.target,
            target: selectedCurrencies.source,
        });
    }

    return (
        <CurrencySelectorContext.Provider
            value={{
                currencies: data,
                isCurrenciesFetching: isPending,
                selectedCurrencies,
                updateSelectedCurrencies,
                swapCurrencies,
            }}
        >
            {children}
        </CurrencySelectorContext.Provider>
    );
}
