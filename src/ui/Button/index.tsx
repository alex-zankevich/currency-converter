import type { ComponentProps } from 'react';

import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '@/lib';

const buttonVariants = tv({
    base: 'flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-semibold transition-colors duration-200 disabled:opacity-70',
    variants: {
        variant: {
            primary:
                'border-blue-200 bg-blue-50 text-blue-700 enabled:hover:bg-blue-100',
            success:
                'border-green-200 bg-green-50 text-green-700 enabled:hover:bg-green-100',
            neutral:
                'border-neutral-200 bg-neutral-50 text-neutral-700 enabled:hover:bg-neutral-100',
            error: 'border-red-200 bg-red-50 text-red-700 enabled:hover:bg-red-100',
            text: 'border-0 bg-transparent enabled:hover:bg-neutral-100',
        },
    },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends ComponentProps<'button'>, ButtonVariants {}

export function Button({
    children,
    className,
    variant = 'neutral',
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ variant }), className)}
            {...props}
        >
            {children}
        </button>
    );
}
