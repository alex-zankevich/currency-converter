import { useEffect, useRef, useState } from 'react';

const KeyCodes = {
    ArrowDown: 'ArrowDown',
    ArrowUp: 'ArrowUp',
    Enter: 'Enter',
    Space: ' ',
} as const;

export function useListKeyboardNav(
    itemCount: number,
    onSelect: (index: number) => void,
) {
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const itemRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === KeyCodes.ArrowDown) {
                e.preventDefault();
                setFocusedIndex((prev) => (prev + 1) % itemCount);
            } else if (e.key === KeyCodes.ArrowUp) {
                e.preventDefault();
                setFocusedIndex((prev) => (prev - 1 + itemCount) % itemCount);
            } else if (
                (e.key === KeyCodes.Enter || e.key === KeyCodes.Space) &&
                focusedIndex >= 0
            ) {
                e.preventDefault();
                onSelect(focusedIndex);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [itemCount, focusedIndex, onSelect]);

    useEffect(() => {
        if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
            itemRefs.current[focusedIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [focusedIndex]);

    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, itemCount);
        setFocusedIndex(-1);
    }, [itemCount]);

    return {
        focusedIndex,
        itemRefs,
        setFocusedIndex,
    };
}
