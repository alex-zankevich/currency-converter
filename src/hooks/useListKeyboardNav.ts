import { useEffect, useRef, useState } from 'react';

const KEY_CODES = {
    ARROW_DOWN: 'ArrowDown',
    ARROW_UP: 'ArrowUp',
    ENTER: 'Enter',
    SPACE: ' ',
} as const;

interface UseListKeyboardNavProps {
    itemsCount: number;
    onSelect: (index: number) => void;
}

export function useListKeyboardNav({
    itemsCount,
    onSelect,
}: UseListKeyboardNavProps) {
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const itemRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;

            switch (key) {
                case KEY_CODES.ARROW_DOWN:
                    event.preventDefault();
                    setFocusedIndex((prev) => (prev + 1) % itemsCount);
                    break;

                case KEY_CODES.ARROW_UP:
                    event.preventDefault();
                    setFocusedIndex(
                        (prev) => (prev - 1 + itemsCount) % itemsCount,
                    );
                    break;

                case KEY_CODES.ENTER:
                case KEY_CODES.SPACE:
                    if (focusedIndex >= 0) {
                        event.preventDefault();
                        onSelect(focusedIndex);
                    }
                    break;

                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [itemsCount, focusedIndex, onSelect]);

    useEffect(() => {
        if (focusedIndex >= 0) {
            itemRefs.current[focusedIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [focusedIndex]);

    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, itemsCount);
        setFocusedIndex(-1);
    }, [itemsCount]);

    return {
        focusedIndex,
        itemRefs,
        setFocusedIndex,
    };
}
