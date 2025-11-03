import { formatNumber, getFormatedExchangeRate } from '@/lib';
import type { ConversionResultData } from '@/types';
import { Skeleton } from '@/ui/Skeleton';
import { Text } from '@/ui/Text';

export interface ConversionResultProps {
    resultData?: ConversionResultData;
    isLoading?: boolean;
}

export function ConversionResult({
    resultData,
    isLoading,
}: ConversionResultProps) {
    return (
        <div>
            <Text variant="heading">Conversion result</Text>
            <div className="flex flex-col items-center gap-1 truncate border-b border-neutral-200 py-6">
                <Skeleton className="h-8 w-30" isLoading={isLoading}>
                    <Text className="max-w-full text-2xl font-bold" truncate>
                        {resultData?.targetSymbol}{' '}
                        {formatNumber(resultData?.resultAmount)}
                    </Text>
                </Skeleton>
                <Skeleton className="h-4 w-20" isLoading={isLoading}>
                    <Text variant="small">
                        {resultData?.sourceAmount}{' '}
                        {resultData?.sourceCurrencyCode} =
                    </Text>
                </Skeleton>
            </div>
            <div className="border-b border-neutral-200 py-6">
                <div className="flex items-center justify-between gap-1 pb-3">
                    <Text variant="small" className="font-semibold text-nowrap">
                        Exchange Rate
                    </Text>
                    <Skeleton className="h-4 w-[50%]" isLoading={isLoading}>
                        <Text variant="heading" className="text-xs" truncate>
                            {resultData &&
                                getFormatedExchangeRate(
                                    resultData.exchangeRate,
                                    resultData.sourceCurrencyCode,
                                    resultData.targetCurrencyCode,
                                )}
                        </Text>
                    </Skeleton>
                </div>

                <div className="flex items-center justify-between gap-1">
                    <Text variant="small" className="font-semibold text-nowrap">
                        Inverse Rate
                    </Text>
                    <Skeleton className="h-4 w-[50%]" isLoading={isLoading}>
                        <Text variant="heading" className="text-xs" truncate>
                            {resultData &&
                                getFormatedExchangeRate(
                                    resultData.inverseRate,
                                    resultData.targetCurrencyCode,
                                    resultData.sourceCurrencyCode,
                                )}
                        </Text>
                    </Skeleton>
                </div>
            </div>
            <Text
                variant="small"
                className="mt-6 rounded-xl bg-neutral-50 px-3 py-2 text-center"
            >
                Rates are for informational purposes only and may not reflect
                real-time market rates
            </Text>
        </div>
    );
}
