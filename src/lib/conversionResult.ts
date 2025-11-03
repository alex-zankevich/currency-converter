import type { ConversionResultData } from '@/types';

export const MAX_DECIMAL_DIGITS = 6;

export function convertAmountToNumber(amount: string) {
    const amountNumber = parseFloat(amount.replace(',', '.'));

    if (isNaN(amountNumber)) return 0;

    return amountNumber;
}

export function truncDecimalPart(
    value: number | string = 0,
    maxDecimals = MAX_DECIMAL_DIGITS,
) {
    return Number(value).toFixed(maxDecimals);
}

export function formatNumber(
    value: number | string = 0,
    maxDecimals = MAX_DECIMAL_DIGITS,
) {
    return parseFloat(truncDecimalPart(value, maxDecimals));
}

export function getFormatedExchangeRate(
    rate: number,
    source?: string,
    target?: string,
) {
    if (!source || !target) return;

    return `1 ${source} = ${truncDecimalPart(rate)} ${target}`;
}

export function calculateConversionResult(
    amount: string,
    rates: Record<string, number> | undefined,
    sourceCurrencyCode: string,
    targetCurrencyCode: string,
    targetCurrencySymbol: string,
): ConversionResultData | undefined {
    if (!rates || !sourceCurrencyCode || !targetCurrencyCode) {
        return undefined;
    }

    const sourceAmount = convertAmountToNumber(amount);
    const exchangeRate = rates[targetCurrencyCode] || 0;
    const resultAmount = sourceAmount * exchangeRate;
    const inverseRate = exchangeRate ? 1 / exchangeRate : 0;

    return {
        targetSymbol: targetCurrencySymbol,
        sourceAmount,
        resultAmount,
        exchangeRate,
        inverseRate,
        sourceCurrencyCode,
        targetCurrencyCode,
    };
}
