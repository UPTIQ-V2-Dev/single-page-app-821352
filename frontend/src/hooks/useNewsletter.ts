import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { subscribeToNewsletter } from '@/services/contact';
import type { NewsletterData } from '@/types/contact';

export const useNewsletter = () => {
    return useMutation({
        mutationFn: (data: NewsletterData) => subscribeToNewsletter(data),
        onSuccess: (response) => {
            toast.success(response.message);
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Failed to subscribe. Please try again.';
            toast.error(message);
        },
    });
};