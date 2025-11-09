import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { CurrencySelectionState } from '@/types';

const DEFAULT_SELECTED_CURRENCIES: CurrencySelectionState = {
    source: 'USD',
    target: 'EUR',
};

interface CurrencyState {
    selectedCurrencies: CurrencySelectionState;
    updateSelectedCurrencies(value: Partial<CurrencySelectionState>): void;
}

export const useCurrencyStore = create<CurrencyState>()(
    persist(
        (set) => ({
            selectedCurrencies: DEFAULT_SELECTED_CURRENCIES,
            updateSelectedCurrencies(value: Partial<CurrencySelectionState>) {
                set((state) => ({
                    selectedCurrencies: {
                        ...state.selectedCurrencies,
                        ...value,
                    },
                }));
            },
        }),
        {
            name: 'selected-currencies-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export const useSelectedCurrencies = () =>
    useCurrencyStore((state) => state.selectedCurrencies);

export const useUpdateSelectedCurrency = () =>
    useCurrencyStore((state) => state.updateSelectedCurrencies);
