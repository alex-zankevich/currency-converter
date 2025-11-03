export interface ConversionResultData {
    targetSymbol: string;
    sourceAmount: number;
    resultAmount: number;
    exchangeRate: number;
    inverseRate: number;
    sourceCurrencyCode: string;
    targetCurrencyCode: string;
}
