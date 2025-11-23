import CrossIcon from '@/assets/icons/cross.svg?react';
import { cn } from '@/lib';
import { type Toast, type ToastType } from '@/types';

import { Button } from '../../ui/Button';
import { Text } from '../../ui/Text';

interface ToastProps {
    toast: Toast;
    onClose?(): void;
}

const ToastVariants: Record<ToastType, string> = {
    error: 'bg-red-200 border border-red-200 text-red-800 text-red-900',
    success:
        'bg-green-200 border border-green-200 text-green-800 text-green-900',
    warning:
        'bg-yellow-200 border border-yellow-200 text-yellow-800 text-yellow-900',
    info: 'bg-blue-200 border border-blue-200 text-blue-800 text-blue-900',
} as const;

export function Toast({ toast, onClose }: ToastProps) {
    const classes = cn(
        'flex items-center rounded-lg shadow-lg py-2 px-3 max-w-sm w-full transform transition-all duration-300 ease-in-out',
        ToastVariants[toast.type],
    );

    return (
        <div className={classes}>
            <Text className="flex-1 font-semibold text-inherit" variant="small">
                {toast.message}
            </Text>
            <Button
                variant="text"
                onClick={onClose}
                className="px-1 py-1 text-inherit enabled:hover:bg-transparent"
            >
                <CrossIcon fill="currentColor" />
            </Button>
        </div>
    );
}
