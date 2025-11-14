import { Button } from '@/components/ui/button';
import { ArrowDown, Play } from 'lucide-react';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export const HeroSection = () => {
    const { scrollToSection } = useScrollToSection();
    const { targetRef, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

    return (
        <section
            id="hero"
            ref={targetRef}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            
            <div 
                className={`container mx-auto px-4 text-center relative z-10 transition-all duration-1000 ${
                    hasIntersected 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                }`}
            >
                {/* Hero Content */}
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-muted/50 backdrop-blur">
                            ✨ Built with React 19 & Modern Stack
                        </div>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
                        Build Amazing{' '}
                        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Experiences
                        </span>
                    </h1>
                    
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                        Create stunning applications with our modern React toolkit featuring 
                        the latest technologies and best practices for exceptional user experiences.
                    </p>
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Button 
                            size="lg" 
                            className="text-base px-8 py-3 h-12"
                            onClick={() => scrollToSection('features')}
                        >
                            Get Started
                            <ArrowDown className="ml-2 h-4 w-4" />
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            size="lg" 
                            className="text-base px-8 py-3 h-12"
                        >
                            <Play className="mr-2 h-4 w-4" />
                            Watch Demo
                        </Button>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-lg mx-auto">
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-primary">99%</div>
                            <div className="text-sm text-muted-foreground">Performance Score</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-primary">24/7</div>
                            <div className="text-sm text-muted-foreground">Support</div>
                        </div>
                        <div className="text-center col-span-2 md:col-span-1">
                            <div className="text-2xl sm:text-3xl font-bold text-primary">1000+</div>
                            <div className="text-sm text-muted-foreground">Happy Users</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => scrollToSection('features')}
                    className="rounded-full"
                >
                    <ArrowDown className="h-4 w-4" />
                </Button>
            </div>
        </section>
    );
};