import { useState } from 'react';

import SearchIcon from '@/assets/icons/search.svg?react';
import { useCurrencySelectorContext } from '@/contexts/CurrencySelector';
import { filterCurrencies } from '@/lib';
import { Input } from '@/ui/Input/Input';
import { Text } from '@/ui/Text';

import { CurrencyList } from '../CurrencyList';

export interface SelectCurrencyModalContentProps {
    selectedCurrency: string;
    onSelect(currencyCode: string): void;
}

export function SelectCurrencyModalContent({
    selectedCurrency,
    onSelect,
}: SelectCurrencyModalContentProps) {
    const { currencies = {} } = useCurrencySelectorContext();
    const [search, setSearch] = useState('');

    const filteredCurrencies = filterCurrencies(
        Object.values(currencies),
        search,
    );

    return (
        <div className="flex flex-col">
            <Text variant="caption">
                Choose a currency from the list below or use the search bar to
                find a specific currency.
            </Text>

            <div className="sticky top-12 bg-white py-3">
                <Input
                    type="text"
                    className="px-3 py-2 pl-9"
                    value={search}
                    placeholder="Search currency"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2" />
            </div>

            <CurrencyList
                items={filteredCurrencies}
                selected={selectedCurrency}
                onSelect={onSelect}
            />
        </div>
    );
}
