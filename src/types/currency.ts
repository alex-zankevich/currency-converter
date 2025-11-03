export interface CurrencyInfo {
    code: string;
    decimal_digits: number;
    name: string;
    name_plural: string;
    rounding: number;
    symbol: string;
    symbol_native: string;
}

export type CurrencyRates = Record<string, number>;

export interface RateInfo {
    base: string;
    date: string;
    rates: CurrencyRates;
    timestamp: number;
}

export interface CurrencySelectionState {
    source: string;
    target: string;
}
