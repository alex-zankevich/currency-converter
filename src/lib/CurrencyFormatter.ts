export const FRACTION_DIGITS_COUNT = 6;

const DEFAULT_OPTIONS: Intl.NumberFormatOptions = {
    minimumFractionDigits: FRACTION_DIGITS_COUNT,
    maximumFractionDigits: FRACTION_DIGITS_COUNT,
};

export class CurrencyFormatter {
    private formatter;

    constructor(options: Intl.NumberFormatOptions = {}) {
        this.formatter = new Intl.NumberFormat(undefined, {
            ...DEFAULT_OPTIONS,
            ...options,
        });
    }

    public format(value: number = 0, symbol?: string, prepend = false) {
        const formattedValue = this.formatter.format(value);

        if (!symbol) return formattedValue;

        if (prepend) {
            return `${symbol} ${formattedValue}`;
        }

        return `${formattedValue} ${symbol}`;
    }

    public static parseString(value: string) {
        const numberValue = parseFloat(value.replace(',', '.'));

        return !isNaN(numberValue) ? numberValue : 0;
    }
}
