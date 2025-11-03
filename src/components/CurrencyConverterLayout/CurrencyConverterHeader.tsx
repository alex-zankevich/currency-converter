import { Text } from '@/ui/Text';

export function CurrencyConverterHeader() {
    return (
        <div className="text-center">
            <Text as="h1" variant="heading" className="mb-2 text-3xl">
                Currency converter
            </Text>
            <Text variant="caption">Get real-time exchange rates</Text>
        </div>
    );
}
