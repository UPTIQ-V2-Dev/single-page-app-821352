import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Palette, Code2, Rocket, Globe } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const features = [
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Built with Vite and optimized for maximum performance with React 19 concurrent features.',
        badge: 'Performance',
    },
    {
        icon: Shield,
        title: 'Type Safe',
        description: 'Full TypeScript support with strict type checking for reliable, maintainable code.',
        badge: 'Reliability',
    },
    {
        icon: Palette,
        title: 'Modern Design',
        description: 'Beautiful UI components with Shadcn/ui and Tailwind CSS v4 for stunning interfaces.',
        badge: 'Design',
    },
    {
        icon: Code2,
        title: 'Developer Experience',
        description: 'Hot reload, ESLint, Prettier, and Vitest configured for the best development experience.',
        badge: 'DX',
    },
    {
        icon: Rocket,
        title: 'Production Ready',
        description: 'Optimized builds, lazy loading, and modern bundling techniques for deployment.',
        badge: 'Production',
    },
    {
        icon: Globe,
        title: 'Responsive',
        description: 'Mobile-first design that works beautifully on all devices and screen sizes.',
        badge: 'Mobile',
    },
];

export const FeaturesSection = () => {
    const { targetRef, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });

    return (
        <section id="features" ref={targetRef} className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div 
                    className={`text-center mb-16 transition-all duration-1000 delay-200 ${
                        hasIntersected 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        Powerful Features
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to build modern, scalable applications with confidence and speed.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <Card 
                                key={feature.title}
                                className={`group hover:shadow-lg transition-all duration-500 border-muted hover:border-primary/20 ${
                                    hasIntersected 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-8'
                                }`}
                                style={{ 
                                    transitionDelay: hasIntersected ? `${400 + index * 100}ms` : '0ms' 
                                }}
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {feature.badge}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Additional Info */}
                <div 
                    className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
                        hasIntersected 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-8'
                    }`}
                >
                    <p className="text-muted-foreground">
                        Built with modern technologies and best practices for exceptional performance.
                    </p>
                </div>
            </div>
        </section>
    );
};