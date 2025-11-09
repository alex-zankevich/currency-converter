import type {
    ConversionResultData,
    CurrencySelectionState,
    RateInfo,
} from '@/types';

import { calculateRates } from './conversion';

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

export function getConversionResultData(
    amount: string,
    { rates = {} }: RateInfo,
    { source, target }: CurrencySelectionState,
    targetCurrencySymbol: string,
): ConversionResultData | undefined {
    const rateBaseToSource = rates[source];
    const rateBaseToTarget = rates[target];

    if (!rateBaseToSource || !rateBaseToTarget || rateBaseToSource === 0)
        return;

    const { exchangeRate, inverseRate } = calculateRates(
        rateBaseToSource,
        rateBaseToTarget,
    );
    const sourceAmount = convertAmountToNumber(amount);
    const resultAmount = sourceAmount * exchangeRate;

    return {
        targetSymbol: targetCurrencySymbol,
        sourceAmount,
        resultAmount,
        exchangeRate,
        inverseRate,
        sourceCurrencyCode: source,
        targetCurrencyCode: target,
    };
}
