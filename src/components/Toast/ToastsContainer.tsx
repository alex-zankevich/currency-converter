import { useRemoveToast, useToasts } from '@/stores';

import { Toast } from './Toast';

export function ToastContainer() {
    const toasts = useToasts();
    const removeToast = useRemoveToast();

    if (!toasts.length) return null;

    return (
        <div className="fixed left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 transform flex-col items-center space-y-4 p-4">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}
