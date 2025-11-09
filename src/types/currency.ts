export interface CurrencyInfo {
    code: string;
    name: string;
    symbol: string;
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
