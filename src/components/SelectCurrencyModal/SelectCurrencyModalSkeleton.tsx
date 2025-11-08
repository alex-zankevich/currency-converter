import { Skeleton } from '@/ui/Skeleton';

export function SelectCurrencyModalSkeleton() {
    return (
        <div className='flex flex-col gap-2'>
            <Skeleton className="h-4 w-full" isLoading />
            <Skeleton className="h-4 w-[50%]" isLoading />
            <Skeleton className="h-8 w-full my-1" isLoading />
            <Skeleton className="h-11 w-full" isLoading />
            <Skeleton className="h-11 w-full" isLoading />
            <Skeleton className="h-11 w-full" isLoading />
            <Skeleton className="h-11 w-full" isLoading />
        </div>
    );
}
