import type { ReactNode } from 'react';

import { cn } from 'tailwind-variants';

export interface SkeletonProps {
    isLoading?: boolean;
    className?: string;
    children?: ReactNode;
}

export function Skeleton({
    className = '',
    isLoading,
    children,
}: SkeletonProps) {
    if (!isLoading) return children;

    return (
        <div
            className={cn(
                'h-2 animate-pulse rounded bg-neutral-100',
                className,
            )}
        />
    );
}
