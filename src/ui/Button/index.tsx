import type { ComponentProps, PropsWithChildren } from 'react';

import { cn } from '@/lib';

export const ButtonVariants = {
    blue: ' border-blue-200 bg-blue-50 text-blue-700 enabled:hover:bg-blue-100 disabled:opacity-70',
    green: 'border-green-200 bg-green-50 text-green-700 enabled:hover:bg-green-100 disabled:opacity-70',
    neutral:
        'border-neutral-200 bg-neutral-50 text-neutral-700 enabled:hover:bg-neutral-100 disabled:opacity-70',
    red: 'border-red-200 bg-red-50 text-red-700 enabled:hover:bg-red-100 disabled:opacity-70',
} as const;

export interface ButtonProps
    extends PropsWithChildren,
        ComponentProps<'button'> {
    variant?: keyof typeof ButtonVariants;
}

export function Button({
    children,
    className,
    variant = 'neutral',
    ...props
}: ButtonProps) {
    const classes = cn(
        'flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-semibold transition-colors duration-200',
        ButtonVariants[variant],
        className,
    );

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
