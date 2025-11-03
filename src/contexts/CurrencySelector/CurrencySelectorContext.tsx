import { createContext } from 'react';

import type { CurrencyInfo, CurrencySelectionState } from '@/types';

export interface CurrencySelectorState {
    currencies?: Record<string, CurrencyInfo>;
    isCurrenciesFetching: boolean;
    selectedCurrencies: CurrencySelectionState;
    updateSelectedCurrencies(value: Partial<CurrencySelectionState>): void;
    swapCurrencies(): void;
}

export const DEFAULT_SELECTED_CURRENCIES: CurrencySelectionState = {
    source: 'USD',
    target: 'EUR',
};

export const CurrencySelectorContext =
    createContext<CurrencySelectorState | null>(null);
