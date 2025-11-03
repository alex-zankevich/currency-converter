import type { ComponentProps } from 'react';

import { cn } from '@/lib';

export type LabelProps = ComponentProps<'label'>;

export function Label({ children, className }: LabelProps) {
    const classes = cn('mb-2 block text-xs font-semibold', className);

    return <label className={classes}>{children}</label>;
}
