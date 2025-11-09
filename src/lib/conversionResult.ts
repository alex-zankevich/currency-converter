import type {
    ConversionResultData,
    CurrencySelectionState,
    RateInfo,
} from '@/types';

import { CurrencyFormatter } from './CurrencyFormatter';
import { calculateRates } from './conversion';

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
    const sourceAmount = CurrencyFormatter.parseString(amount);
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

export function getFormatedExchangeRate(
    rate: number,
    source?: string,
    target?: string,
) {
    if (!source || !target) return;

    const formatter = new CurrencyFormatter();

    return `1 ${source} = ${formatter.format(rate, target)}`;
}

export function getResultDisplayData(resultData?: ConversionResultData) {
    const amountFormatter = new CurrencyFormatter({ minimumFractionDigits: 0 });

    return {
        resultAmount: amountFormatter.format(
            resultData?.resultAmount,
            resultData?.targetSymbol,
            true,
        ),
        sourceAmount: amountFormatter.format(
            resultData?.sourceAmount,
            `${resultData?.sourceCurrencyCode} =`,
        ),
        exchangeRate:
            resultData &&
            getFormatedExchangeRate(
                resultData.exchangeRate,
                resultData.sourceCurrencyCode,
                resultData.targetCurrencyCode,
            ),
        inverseRate:
            resultData &&
            getFormatedExchangeRate(
                resultData.inverseRate,
                resultData.targetCurrencyCode,
                resultData.sourceCurrencyCode,
            ),
    };
}
