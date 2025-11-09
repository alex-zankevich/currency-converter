import { Text } from '@/ui/Text';

export function FailedResultInfo() {
    return (
        <div className="text-center">
            <Text>Failed to calculate result.</Text>
            <Text variant="caption">Try refresh rates or reload the page.</Text>
        </div>
    );
}
