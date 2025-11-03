import type { CurrencyInfo, RateInfo } from '@/types';

export const BASE_URL = 'https://api.fxratesapi.com';

export async function getCurrencies(): Promise<Record<string, CurrencyInfo>> {
    const res = await fetch(`${BASE_URL}/currencies`);

    if (!res.ok) {
        throw new Error('Failed to fetch currencies.');
    }

    return res.json();
}

export async function getRates(
    sourceCode: string,
    targetCode: string,
    base = sourceCode,
): Promise<RateInfo> {
    const params = new URLSearchParams({
        base,
        currencies: `${sourceCode},${targetCode}`,
        resolution: '1m',
        amount: '1',
        places: '6',
        format: 'json',
    });
    const res = await fetch(`${BASE_URL}/latest?${params.toString()}`);

    if (!res.ok) {
        throw new Error('Failed to fetch currency rates.');
    }

    return res.json();
}
