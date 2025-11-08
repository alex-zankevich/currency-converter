import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

interface ConverterState {
    amount: string;
    lastUpdatedTimestamp?: number;
    setAmount: (amount: string) => void;
    setLastUpdatedTimestamp: (timestamp: number) => void;
}

export const useConverterStore = create<ConverterState>()(
    persist(
        (set) => ({
            amount: '',
            lastUpdatedTimestamp: undefined,
            setAmount: (amount: string) => set({ amount }),
            setLastUpdatedTimestamp: (timestamp: number) =>
                set({ lastUpdatedTimestamp: timestamp }),
        }),
        {
            name: 'currency-converter-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export const useConversionState = () =>
    useConverterStore(
        useShallow((state) => ({
            amount: state.amount,
            lastUpdatedTimestamp: state.lastUpdatedTimestamp,
        })),
    );

export const useConversionActions = () =>
    useConverterStore(
        useShallow((state) => ({
            setAmount: state.setAmount,
            setLastUpdatedTimestamp: state.setLastUpdatedTimestamp,
        })),
    );
