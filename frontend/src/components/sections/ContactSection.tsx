import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const contactInfo = [
    {
        icon: Mail,
        label: 'Email',
        value: 'hello@yourapp.com',
        description: 'Send us an email anytime!',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+1 (555) 123-4567',
        description: 'Mon-Fri from 8am to 5pm',
    },
    {
        icon: MapPin,
        label: 'Office',
        value: 'San Francisco, CA',
        description: 'Come and visit our office',
    },
    {
        icon: Clock,
        label: 'Response Time',
        value: '< 24 hours',
        description: 'We respond quickly!',
    },
];

export const ContactSection = () => {
    const { targetRef, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });

    return (
        <section id="contact" ref={targetRef} className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div 
                    className={`text-center mb-16 transition-all duration-1000 ${
                        hasIntersected 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have a question or want to work together? We'd love to hear from you.
                        Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <div 
                        className={`lg:col-span-2 transition-all duration-1000 delay-200 ${
                            hasIntersected 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 -translate-x-8'
                        }`}
                    >
                        <Card className="p-6">
                            <CardHeader className="px-0 pt-0">
                                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                                <CardDescription>
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-0 pb-0">
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Info & Newsletter */}
                    <div 
                        className={`space-y-6 transition-all duration-1000 delay-400 ${
                            hasIntersected 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 translate-x-8'
                        }`}
                    >
                        {/* Contact Information */}
                        <Card className="p-6">
                            <CardHeader className="px-0 pt-0">
                                <CardTitle className="text-lg">Contact Information</CardTitle>
                                <CardDescription>
                                    Reach out to us through any of these channels.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-0 pb-0">
                                <div className="space-y-4">
                                    {contactInfo.map((info, index) => {
                                        const Icon = info.icon;
                                        return (
                                            <div 
                                                key={info.label} 
                                                className={`flex items-start gap-3 transition-all duration-500 ${
                                                    hasIntersected 
                                                        ? 'opacity-100 translate-y-0' 
                                                        : 'opacity-0 translate-y-4'
                                                }`}
                                                style={{ 
                                                    transitionDelay: hasIntersected ? `${600 + index * 100}ms` : '0ms' 
                                                }}
                                            >
                                                <div className="p-2 rounded-lg bg-primary/10">
                                                    <Icon className="h-4 w-4 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm">{info.label}</p>
                                                    <p className="text-sm font-semibold">{info.value}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {info.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        <Separator />

                        {/* Newsletter Subscription */}
                        <Card className="p-6">
                            <CardHeader className="px-0 pt-0">
                                <CardTitle className="text-lg">Stay Updated</CardTitle>
                                <CardDescription>
                                    Subscribe to our newsletter for the latest updates and news.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-0 pb-0">
                                <NewsletterForm />
                            </CardContent>
                        </Card>

                        {/* Quick Response Info */}
                        <div 
                            className={`p-4 rounded-lg bg-primary/5 border border-primary/20 text-center transition-all duration-1000 delay-700 ${
                                hasIntersected 
                                    ? 'opacity-100 translate-y-0' 
                                    : 'opacity-0 translate-y-4'
                            }`}
                        >
                            <p className="text-sm font-medium mb-1">Quick Response Guaranteed</p>
                            <p className="text-xs text-muted-foreground">
                                We typically respond to all inquiries within 2-4 hours during business hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};