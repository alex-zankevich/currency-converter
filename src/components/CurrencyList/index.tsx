import TickIcon from '@/assets/icons/tick.svg?react';
import { useListKeyboardNav } from '@/hooks';
import { cn } from '@/lib';
import type { CurrencyInfo } from '@/types';

import { CurrencyItem } from '../CurrencyItem';

export interface CurrencyListProps {
    items: CurrencyInfo[];
    selected: string;
    onSelect(currencyCode: string): void;
}

export function CurrencyList({ items, onSelect, selected }: CurrencyListProps) {
    const { focusedIndex, itemRefs } = useListKeyboardNav({
        itemsCount: items.length,
        onSelect: handleKeyboardSelect,
    });

    function handleKeyboardSelect(index: number) {
        if (items[index]) {
            onSelect(items[index].code);
        }
    }

    return (
        <ul className="flex flex-col gap-2">
            {items.map(({ code, name, symbol }, index) => {
                return (
                    <li
                        key={code}
                        ref={(el) => {
                            if (el) itemRefs.current[index] = el;
                        }}
                        onClick={() => onSelect(code)}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-2 py-3 text-neutral-700 transition-colors duration-200 hover:bg-neutral-100',
                            {
                                'bg-neutral-100':
                                    selected === code || focusedIndex === index,
                            },
                        )}
                    >
                        <CurrencyItem
                            currency={{
                                code,
                                name,
                                symbol,
                            }}
                        />
                        {selected === code && <TickIcon className="m-1" />}
                    </li>
                );
            })}
        </ul>
    );
}
