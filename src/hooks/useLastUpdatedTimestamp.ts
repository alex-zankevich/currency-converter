import { useEffect } from 'react';

import { useConversionActions, useConversionState } from '@/stores';
import type { RateInfo } from '@/types';

import { useIsOnline } from './useIsOnline';

export function useLastUpdatedTimestamp(rates?: RateInfo) {
    const isOnline = useIsOnline();
    const { lastUpdatedTimestamp } = useConversionState();
    const { setLastUpdatedTimestamp } = useConversionActions();

    useEffect(() => {
        if (rates && isOnline) setLastUpdatedTimestamp(Date.now());
    }, [isOnline, rates, setLastUpdatedTimestamp]);

    return lastUpdatedTimestamp;
}
