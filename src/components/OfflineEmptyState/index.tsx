import OfflineIcon from '@/assets/icons/wifi-offline.svg?react';
import { Text } from '@/ui/Text';

export function OfflineEmptyState() {
    return (
        <div className="text-center">
            <OfflineIcon width="100px" height="100px" className="mx-auto" />
            <Text variant="heading" as="h1">
                You are offline!
            </Text>
            <Text>
                You are offline and there is no currency information to display.
            </Text>
            <Text>Please connect to the network and refresh the page.</Text>
        </div>
    );
}
