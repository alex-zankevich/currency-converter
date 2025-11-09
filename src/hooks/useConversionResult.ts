import { useMemo } from 'react';

import { getConversionResultData } from '@/lib';
import type { CurrencyInfo, CurrencySelectionState, RateInfo } from '@/types';

import { useDebounce } from './useDebounce';

const AMOUNT_CHANGE_DEBOUNCE = 250;

export function useConversionResult(
    amount: string,
    selectedCurrencies?: CurrencySelectionState,
    rates?: RateInfo,
    currencies?: Record<string, CurrencyInfo>,
) {
    const debouncedAmount = useDebounce(amount, AMOUNT_CHANGE_DEBOUNCE);

    return useMemo(() => {
        if (!rates || !currencies || !selectedCurrencies) return;

        const targetCurrency = currencies[selectedCurrencies.target];
        const targetCurrencySymbol = targetCurrency?.symbol || '';

        return getConversionResultData(
            debouncedAmount,
            rates,
            selectedCurrencies,
            targetCurrencySymbol,
        );
    }, [debouncedAmount, rates, currencies, selectedCurrencies]);
}
