import { create } from 'zustand';

import type { Toast } from '@/types';

const DEFAULT_TOAST_TIMEOUT = 5000;

interface ToastStore {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (toast) => {
        const id = crypto.randomUUID();
        const newToast: Toast = {
            id,
            duration: DEFAULT_TOAST_TIMEOUT,
            ...toast,
        };

        set((state) => ({
            toasts: [newToast, ...state.toasts],
        }));

        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((toast) => toast.id !== id),
            }));
        }, newToast.duration);
    },
    removeToast: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        }));
    },
    clearToasts: () => {
        set({ toasts: [] });
    },
}));

export const useToasts = () => useToastStore((state) => state.toasts);
export const useAddToast = () => useToastStore((state) => state.addToast);
export const useRemoveToast = () => useToastStore((state) => state.removeToast);
