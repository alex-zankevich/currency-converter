import type { ComponentPropsWithRef } from 'react';

import { cn } from '@/lib';

export type InputProps = ComponentPropsWithRef<'input'>;

export function Input({ ref, className, ...props }: InputProps) {
    const classes = cn(
        'w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2',
        className,
    );

    return <input ref={ref} className={classes} {...props} />;
}
