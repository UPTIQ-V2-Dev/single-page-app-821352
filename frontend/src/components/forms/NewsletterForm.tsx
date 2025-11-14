import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Mail, Loader2 } from 'lucide-react';
import { newsletterSchema, type NewsletterSchema } from '@/lib/validations';
import { useNewsletter } from '@/hooks/useNewsletter';

export const NewsletterForm = () => {
    const { mutate: subscribe, isPending } = useNewsletter();
    
    const form = useForm<NewsletterSchema>({
        resolver: zodResolver(newsletterSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (data: NewsletterSchema) => {
        subscribe(data, {
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <FormControl>
                                    <Input 
                                        type="email"
                                        placeholder="Enter your email address" 
                                        {...field}
                                        disabled={isPending}
                                        className="flex-1"
                                    />
                                </FormControl>
                                <Button 
                                    type="submit"
                                    disabled={isPending}
                                    className="sm:w-auto"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Subscribing...
                                        </>
                                    ) : (
                                        <>
                                            <Mail className="mr-2 h-4 w-4" />
                                            Subscribe
                                        </>
                                    )}
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};