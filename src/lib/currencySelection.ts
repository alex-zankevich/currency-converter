import type { CurrencyInfo } from '@/types';

export function filterCurrencies(currencies: CurrencyInfo[], search: string) {
    return currencies.filter(
        (currency) =>
            currency.code.toLowerCase().includes(search.toLowerCase()) ||
            currency.name.toLowerCase().includes(search.toLowerCase()),
    );
}
