import { use } from 'react';

import { CurrencySelectorContext } from './CurrencySelectorContext';

export function useCurrencySelectorContext() {
    const context = use(CurrencySelectorContext);

    if (!context) {
        throw new Error(
            'useCurrencySelectorContext should be used inside CurrencySelectorProvider!',
        );
    }

    return context;
}
