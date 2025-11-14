import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { submitContactForm } from '@/services/contact';
import type { ContactFormData } from '@/types/contact';

export const useContactForm = () => {
    return useMutation({
        mutationFn: (data: ContactFormData) => submitContactForm(data),
        onSuccess: (response) => {
            toast.success(response.message);
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Failed to send message. Please try again.';
            toast.error(message);
        },
    });
};