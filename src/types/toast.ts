export type ToastType = 'error' | 'info' | 'success' | 'warning';

export interface Toast {
    id: string;
    type: ToastType;
    message?: string;
    duration?: number;
}
