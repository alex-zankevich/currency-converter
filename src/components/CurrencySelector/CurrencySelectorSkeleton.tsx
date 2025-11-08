import { Skeleton } from '@/ui/Skeleton';

export function CurrencySelectorSekeleton() {
    return (
        <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex-1">
                <Skeleton className="mb-2 h-4 w-15" isLoading />
                <Skeleton className="h-[46px] w-full" isLoading />
            </div>
            <Skeleton className="h-11 w-11 self-center md:self-end" isLoading />
            <div className="flex-1">
                <Skeleton className="mb-2 h-4 w-15" isLoading />
                <Skeleton className="h-[46px] w-full" isLoading />
            </div>
        </div>
    );
}
