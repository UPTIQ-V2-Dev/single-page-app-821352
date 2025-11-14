import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Users, Award, TrendingUp } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useScrollToSection } from '@/hooks/useScrollToSection';

const achievements = [
    { icon: Users, label: 'Active Users', value: '10K+' },
    { icon: Award, label: 'Industry Awards', value: '25+' },
    { icon: TrendingUp, label: 'Growth Rate', value: '150%' },
];

const skills = [
    { name: 'React Development', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Performance Optimization', level: 92 },
];

const highlights = [
    'Built with modern React 19 features',
    'Fully responsive and accessible design',
    'Optimized for performance and SEO',
    'Comprehensive testing coverage',
    'Continuous integration and deployment',
    'Open source and community driven',
];

export const AboutSection = () => {
    const { targetRef, hasIntersected } = useIntersectionObserver({ threshold: 0.2 });
    const { scrollToSection } = useScrollToSection();

    return (
        <section id="about" ref={targetRef} className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div 
                        className={`transition-all duration-1000 ${
                            hasIntersected 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 -translate-x-8'
                        }`}
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                            About Our Platform
                        </h2>
                        
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            We're passionate about creating exceptional web experiences using cutting-edge 
                            technologies. Our platform combines the power of React 19, modern tooling, 
                            and beautiful design to help you build amazing applications.
                        </p>
                        
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            With a focus on performance, accessibility, and developer experience, we provide 
                            everything you need to create scalable, maintainable applications that delight users.
                        </p>

                        {/* Key Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {highlights.map((highlight, index) => (
                                <div 
                                    key={index} 
                                    className={`flex items-center gap-2 transition-all duration-500 ${
                                        hasIntersected 
                                            ? 'opacity-100 translate-x-0' 
                                            : 'opacity-0 -translate-x-4'
                                    }`}
                                    style={{ 
                                        transitionDelay: hasIntersected ? `${300 + index * 100}ms` : '0ms' 
                                    }}
                                >
                                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{highlight}</span>
                                </div>
                            ))}
                        </div>

                        <Button 
                            size="lg" 
                            onClick={() => scrollToSection('contact')}
                            className="mb-8"
                        >
                            Get in Touch
                        </Button>

                        {/* Skills/Progress Bars */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold mb-3">Technical Expertise</h3>
                            {skills.map((skill, index) => (
                                <div 
                                    key={skill.name}
                                    className={`transition-all duration-700 ${
                                        hasIntersected 
                                            ? 'opacity-100 translate-x-0' 
                                            : 'opacity-0 -translate-x-4'
                                    }`}
                                    style={{ 
                                        transitionDelay: hasIntersected ? `${600 + index * 150}ms` : '0ms' 
                                    }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">{skill.name}</span>
                                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                    </div>
                                    <Progress 
                                        value={hasIntersected ? skill.level : 0} 
                                        className="h-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div 
                        className={`transition-all duration-1000 delay-300 ${
                            hasIntersected 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 translate-x-8'
                        }`}
                    >
                        <div className="grid gap-6">
                            {achievements.map((achievement, index) => {
                                const Icon = achievement.icon;
                                return (
                                    <Card 
                                        key={achievement.label}
                                        className={`p-6 hover:shadow-lg transition-all duration-500 ${
                                            hasIntersected 
                                                ? 'opacity-100 translate-y-0' 
                                                : 'opacity-0 translate-y-4'
                                        }`}
                                        style={{ 
                                            transitionDelay: hasIntersected ? `${500 + index * 150}ms` : '0ms' 
                                        }}
                                    >
                                        <CardContent className="p-0">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-lg bg-primary/10">
                                                    <Icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-primary">
                                                        {achievement.value}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {achievement.label}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                            
                            {/* Additional Info Card */}
                            <Card 
                                className={`p-6 bg-primary/5 border-primary/20 ${
                                    hasIntersected 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-4'
                                }`}
                                style={{ 
                                    transitionDelay: hasIntersected ? '950ms' : '0ms' 
                                }}
                            >
                                <CardContent className="p-0 text-center">
                                    <h3 className="font-semibold mb-2">Ready to Start?</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Join thousands of developers building amazing applications.
                                    </p>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => scrollToSection('contact')}
                                    >
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};