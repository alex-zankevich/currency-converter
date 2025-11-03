import type { ComponentProps } from 'react';

import { cn } from '@/lib';

export function Box({ children, className }: ComponentProps<'div'>) {
    const classes = cn('rounded-2xl border border-neutral-300 p-5', className);

    return <div className={classes}>{children}</div>;
}
