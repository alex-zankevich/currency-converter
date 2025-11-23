import { useConversionActions, useConversionState } from '@/stores';
import { NumberInput } from '@/ui/Input';
import { Label } from '@/ui/Label';

export function CurrencyAmount() {
    const { amount } = useConversionState();
    const { setAmount } = useConversionActions();

    return (
        <>
            <Label htmlFor="currency-amount">Amount</Label>
            <NumberInput
                value={amount}
                onChange={(value) => setAmount(value)}
                id="currency-amount"
                className="mb-6 w-full py-3 text-center"
                placeholder="Enter amount"
            />
        </>
    );
}
