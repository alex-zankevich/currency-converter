import type { CurrencyInfo } from '@/types';

const LONG_SYMBOL_LENGTH = 3;

export interface CurrencyItemProps {
    currency?: Pick<CurrencyInfo, 'code' | 'name' | 'symbol'>;
}

export function CurrencyItem({ currency }: CurrencyItemProps) {
    const getSymbolFontSize = (symbol: string) =>
        symbol.length >= LONG_SYMBOL_LENGTH ? 'text-[0.5rem]' : 'text-xs';

    if (!currency) return null;

    return (
        <>
            <span
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-[50%] border border-blue-200 bg-blue-50 text-xs font-normal text-blue-700 ${getSymbolFontSize(currency.symbol)}`}
            >
                {currency.symbol}
            </span>
            <div className="flex flex-1 flex-col items-start truncate text-left">
                <span className="text-sm font-semibold">{currency.code}</span>
                <span
                    className="w-full truncate text-xs font-normal whitespace-nowrap text-neutral-500"
                    title={currency.name}
                >
                    {currency.name}
                </span>
            </div>
        </>
    );
}
