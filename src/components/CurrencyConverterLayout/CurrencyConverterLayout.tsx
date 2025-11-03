import { useState } from 'react';

import { useCurrencySelectorContext } from '@/contexts/CurrencySelector';
import { useRates } from '@/hooks';
import { useConversionResult } from '@/hooks/useConversionResult';
import { Box } from '@/ui/Box';
import { NumberInput } from '@/ui/Input';
import { Label } from '@/ui/Label';

import { ConversionResult } from '../ConversionResult';
import { ConversionStatus } from '../ConverterStatus';
import { CurrencySelector } from '../CurrencySelector';
import { CurrencyConverterHeader } from './CurrencyConverterHeader';

export function CurrencyConverterLayout() {
    const [amount, setAmount] = useState('');

    const { currencies, selectedCurrencies, isCurrenciesFetching } =
        useCurrencySelectorContext();

    const { rates, lastUpdatedTimestamp, isRatesFetching, refetchRates } =
        useRates({ selectedCurrencies });

    const resultData = useConversionResult(
        amount,
        selectedCurrencies,
        rates,
        currencies,
    );

    return (
        <div className="flex max-w-[1000px] flex-col gap-7 p-4">
            <CurrencyConverterHeader />
            <div className="xs:flex-row flex flex-col items-center justify-center gap-4">
                <ConversionStatus
                    lastUpdatedTimestamp={lastUpdatedTimestamp}
                    onRefresh={refetchRates}
                />
            </div>
            <div className="flex flex-col items-start gap-7 sm:flex-row">
                <Box className="w-full sm:flex-2">
                    <Label htmlFor="currency-amount">Amount</Label>
                    <NumberInput
                        value={amount}
                        onChange={(value) => setAmount(value)}
                        id="currency-amount"
                        className="mb-6 w-full py-3 text-center"
                        placeholder="Enter amount"
                    />
                    <CurrencySelector />
                </Box>
                <Box className="min-w-[280px] sm:flex-1">
                    <ConversionResult
                        resultData={resultData}
                        isLoading={isCurrenciesFetching || isRatesFetching}
                    />
                </Box>
            </div>
        </div>
    );
}
