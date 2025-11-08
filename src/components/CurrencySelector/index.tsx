import { Suspense, lazy, useState } from 'react';

import SwapIcon from '@/assets/icons/swap.svg?react';
import { useIsOnline } from '@/hooks';
import { useCurrencies } from '@/queries';
import {
    useSelectedCurrencies,
    useUpdateSelectedCurrency,
} from '@/stores/currencyStore';
import type { CurrencySelectionState } from '@/types';
import { Button } from '@/ui/Button';
import { Label } from '@/ui/Label';
import { Modal } from '@/ui/Modal';

import { CurrencyItem } from '../CurrencyItem';
import { SelectCurrencyModalSkeleton } from '../SelectCurrencyModal/SelectCurrencyModalSkeleton';
import { CurrencySelectorSekeleton } from './CurrencySelectorSkeleton';

const SelectCurrencyModalContent = lazy(() => import('../SelectCurrencyModal'));

export function CurrencySelector() {
    const { data: currencies, isPending: isCurrenciesFetching } =
        useCurrencies();
    const selectedCurrencies = useSelectedCurrencies();
    const updateSelectedCurrencies = useUpdateSelectedCurrency();

    const isOnline = useIsOnline();

    const [modalMode, setModalMode] = useState<
        keyof CurrencySelectionState | null
    >(null);

    function closeModal() {
        setModalMode(null);
    }

    function onCurrencySelect(code: string) {
        if (modalMode) updateSelectedCurrencies({ [modalMode]: code });

        closeModal();
    }

    function swapCurrencies() {
        updateSelectedCurrencies({
            source: selectedCurrencies?.target,
            target: selectedCurrencies?.source,
        });
    }

    if (isCurrenciesFetching) return <CurrencySelectorSekeleton />;

    return (
        <div className="grid grid-cols-[minmax(100px,1fr)_auto_minmax(100px,1fr)] grid-rows-[auto_auto] gap-x-3">
            <Label className="col-start-1 row-start-1 mb-2 text-xs font-semibold">
                From
            </Label>
            <Button
                variant="neutral"
                className="col-start-1 row-start-2 w-full gap-3 text-sm"
                onClick={() => setModalMode('source')}
                disabled={!isOnline}
            >
                <CurrencyItem
                    currency={currencies?.[selectedCurrencies.source]}
                />
            </Button>

            <Button
                variant="neutral"
                className="col-start-2 row-start-2 mb-0.5 self-end border-0 bg-transparent px-3.5 py-3.5"
                onClick={swapCurrencies}
                disabled={!isOnline}
            >
                <SwapIcon className="opacity-inherit" />
            </Button>

            <Label className="col-start-3 row-start-1 mb-2 text-xs font-semibold">
                To
            </Label>
            <Button
                variant="neutral"
                className="col-start-3 row-start-2 w-full gap-3 text-sm"
                onClick={() => setModalMode('target')}
                disabled={!isOnline}
            >
                <CurrencyItem
                    currency={currencies?.[selectedCurrencies.target]}
                />
            </Button>

            <Modal
                isOpen={Boolean(modalMode)}
                onClose={closeModal}
                className="max-h-[min(540px,80vh)] w-[440px] sm:max-h-[min(440px,80vh)]"
                title="Select currency"
            >
                {modalMode && selectedCurrencies && (
                    <Suspense fallback={<SelectCurrencyModalSkeleton />}>
                        <SelectCurrencyModalContent
                            currencies={currencies}
                            selectedCurrency={selectedCurrencies[modalMode]}
                            onSelect={onCurrencySelect}
                        />
                    </Suspense>
                )}
            </Modal>
        </div>
    );
}

export default CurrencySelector;
