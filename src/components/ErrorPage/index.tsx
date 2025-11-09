import AlerIcon from '@/assets/icons/alert.svg?react';
import { Text } from '@/ui/Text';

export function ErrorPage() {
    return (
        <div className="text-center">
            <AlerIcon width="100px" height="100px" className="mx-auto text-red-600" />
            <Text variant="heading" as="h1">
                Something went wrong!
            </Text>
            <Text>
                Some error occured in the application. Please try to refresh the
                page.
            </Text>
        </div>
    );
}
