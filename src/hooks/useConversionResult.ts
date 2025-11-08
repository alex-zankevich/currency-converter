import { useMemo } from 'react';

import { calculateConversionResult } from '@/lib';
import type {
    CurrencyInfo,
    CurrencyRates,
    CurrencySelectionState,
} from '@/types';

export function useConversionResult(
    amount: string,
    selectedCurrencies?: CurrencySelectionState | null,
    rates?: CurrencyRates,
    currencies?: Record<string, CurrencyInfo>,
) {
    return useMemo(() => {
        if (
            !rates ||
            !currencies ||
            !selectedCurrencies?.source ||
            !selectedCurrencies?.target
        ) {
            return undefined;
        }

        const targetCurrency = currencies[selectedCurrencies.target];
        const targetCurrencySymbol = targetCurrency?.symbol || '';

        return calculateConversionResult(
            amount,
            rates,
            selectedCurrencies.source,
            selectedCurrencies.target,
            targetCurrencySymbol,
        );
    }, [amount, rates, currencies, selectedCurrencies]);
}
