import { useCallback } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
    callback: T,
    wait: number
) {
    return useCallback((...args: Parameters<T>) => {
        const timeoutId = setTimeout(() => callback(...args), wait);
        return () => clearTimeout(timeoutId);
    }, [callback, wait]);
}