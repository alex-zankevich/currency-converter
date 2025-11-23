import {
    type ComponentProps,
    type PropsWithChildren,
    useEffect,
    useRef,
} from 'react';
import { createPortal } from 'react-dom';

import { cn } from 'tailwind-variants';

import CrossIcon from '@/assets/icons/cross.svg?react';

import { Button } from '../Button';

export interface ModalProps
    extends PropsWithChildren,
        ComponentProps<'dialog'> {
    isOpen?: boolean;
    onClose?(): void;
    title?: string;
}

export function Modal({
    isOpen,
    children,
    title,
    className,
    onClose,
}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (isOpen) {
            dialog?.showModal();
        } else {
            dialog?.close();
        }
    }, [isOpen]);

    function close() {
        dialogRef.current?.close();
        onClose?.();
    }

    return createPortal(
        <dialog
            ref={dialogRef}
            className={cn(
                'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-4 pt-0 backdrop:bg-black/50',
                className,
            )}
            onCancel={close}
            onClose={close}
        >
            <div className="sticky top-0 flex items-center justify-between bg-inherit pt-4 pb-2">
                <h2 className="font-semibold">{title}</h2>
                <Button variant="text" className="px-2 py-2" onClick={close}>
                    <CrossIcon />
                </Button>
            </div>
            <div className="">{isOpen && children}</div>
        </dialog>,
        document.body,
    );
}
