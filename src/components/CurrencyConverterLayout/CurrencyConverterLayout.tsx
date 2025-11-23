import { Suspense, lazy } from 'react';

import { useLastUpdatedTimestamp } from '@/hooks';
import { useConversionResult } from '@/hooks/useConversionResult';
import { useCurrencies } from '@/queries';
import { useRates } from '@/queries/rates';
import { useConversionState } from '@/stores';
import { useSelectedCurrencies } from '@/stores/currencyStore';
import { Box } from '@/ui/Box';

import { ConversionResult } from '../ConversionResult';
import { ConversionStatus } from '../ConverterStatus';
import { CurrencySelectorSekeleton } from '../CurrencySelector/CurrencySelectorSkeleton';
import { OfflineEmptyState } from '../OfflineEmptyState';
import { CurrencyAmount } from './CurrencyAmount';
import { CurrencyConverterHeader } from './CurrencyConverterHeader';

const CurrencySelector = lazy(() => import('../CurrencySelector'));

export function CurrencyConverterLayout() {
    const { amount } = useConversionState();

    const { data: currencies, isPending: isCurrenciesFetching } =
        useCurrencies();
    const selectedCurrencies = useSelectedCurrencies();

    const {
        data: rates,
        isFetching: isRatesFetching,
        refetch: refetchRates,
    } = useRates(selectedCurrencies);

    const resultData = useConversionResult(
        amount,
        selectedCurrencies,
        rates,
        currencies,
    );

    const lastUpdatedTimestamp = useLastUpdatedTimestamp(rates);

    if (!isCurrenciesFetching && !currencies) return <OfflineEmptyState />;

    return (
        <div className="flex max-w-[1000px] flex-col gap-7 p-4">
            <CurrencyConverterHeader />
            <div className="xs:flex-row flex flex-col items-center justify-center gap-4">
                <ConversionStatus
                    lastUpdatedTimestamp={lastUpdatedTimestamp}
                    onRefresh={refetchRates}
                />
            </div>
            <div className="xs:grid-rows-1 grid grid-rows-[auto_auto] gap-7 sm:grid-cols-2 md:grid-cols-3 md:items-start">
                <Box className="col-start-1 sm:col-span-1 md:col-span-2">
                    <CurrencyAmount />

                    <Suspense fallback={<CurrencySelectorSekeleton />}>
                        <CurrencySelector />
                    </Suspense>
                </Box>
                <Box className="sm:col-span-1 md:col-start-3">
                    <ConversionResult
                        resultData={resultData}
                        isLoading={isCurrenciesFetching || isRatesFetching}
                    />
                </Box>
            </div>
        </div>
    );
}
