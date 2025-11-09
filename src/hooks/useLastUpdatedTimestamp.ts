import { useEffect } from 'react';

import { useConversionActions, useConversionState } from '@/stores';
import type { RateInfo } from '@/types';

export function useLastUpdatedTimestamp(rates?: RateInfo) {
    const { lastUpdatedTimestamp } = useConversionState();
    const { setLastUpdatedTimestamp } = useConversionActions();

    useEffect(() => {
        if (rates) setLastUpdatedTimestamp(Date.now());
    }, [rates, setLastUpdatedTimestamp]);

    return lastUpdatedTimestamp;
}
