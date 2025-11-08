import { Skeleton } from '@/ui/Skeleton';

export function CurrencySelectorSekeleton() {
    return (
        <div className="flex gap-3">
            <div className="flex-1">
                <Skeleton className="mb-2 h-4 w-15" isLoading />
                <Skeleton className="h-[46px] w-full" isLoading />
            </div>
            <Skeleton className="h-11 w-11 self-end" isLoading />
            <div className="flex-1">
                <Skeleton className="mb-2 h-4 w-15" isLoading />
                <Skeleton className="h-[46px] w-full" isLoading />
            </div>
        </div>
    );
}
