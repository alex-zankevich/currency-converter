import { type ChangeEvent, type ComponentProps } from 'react';

import { Input } from './Input';

const NUMBER_REGEXP = /^\d*(\.?|,?)\d*$/;

export interface NumberInputProps
    extends Omit<ComponentProps<typeof Input>, 'onChange'> {
    value?: string;
    onChange?(value: string): void;
}

export function NumberInput({ value, onChange, ...props }: NumberInputProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = (e.target as HTMLInputElement).value;

        if (NUMBER_REGEXP.test(inputValue) || inputValue === '') {
            onChange?.(inputValue);
        }
    };

    return (
        <Input
            type="text"
            value={value}
            onChange={handleChange}
            pattern="[0-9]*"
            inputMode="decimal"
            {...props}
        />
    );
}
