import ClockIcon from '@/assets/icons/clock.svg?react';
import RefreshIcon from '@/assets/icons/refresh.svg?react';
import OfflineIcon from '@/assets/icons/wifi-offline.svg?react';
import OnlineIcon from '@/assets/icons/wifi-online.svg?react';
import { useIsOnline } from '@/hooks';
import { formatDate } from '@/lib';
import { Button } from '@/ui/Button';
import { Text } from '@/ui/Text';

export interface ConversionStatusProps {
    lastUpdatedTimestamp?: number;
    onRefresh(): void;
}

export function ConversionStatus({
    lastUpdatedTimestamp,
    onRefresh,
}: ConversionStatusProps) {
    const isOnline = useIsOnline();

    const lastUpdatedText = `Last updated: ${
        lastUpdatedTimestamp
            ? formatDate(new Date(lastUpdatedTimestamp))
            : 'Never'
    }`;

    const refetchButtonTitle = !isOnline
        ? 'Cannot refetch rates as you are offline'
        : undefined;

    return (
        <>
            {isOnline ? (
                <Button variant="green">
                    <OnlineIcon /> Online
                </Button>
            ) : (
                <Button variant="red">
                    <OfflineIcon /> Offline
                </Button>
            )}

            <Text variant="small" className="flex items-center gap-1">
                <ClockIcon /> {lastUpdatedText}
            </Text>

            <Button
                variant="blue"
                onClick={onRefresh}
                disabled={!isOnline}
                title={refetchButtonTitle}
            >
                <RefreshIcon /> Refresh rates
            </Button>
        </>
    );
}
