import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Moon, Sun, Menu } from 'lucide-react';
import { useScrollToSection } from '@/hooks/useScrollToSection';

const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Features', id: 'features' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
];

export const Header = () => {
    const { theme, setTheme } = useTheme();
    const { scrollToSection } = useScrollToSection();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = (sectionId: string) => {
        scrollToSection(sectionId);
        setMobileMenuOpen(false);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold">Your App</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                onClick={() => handleNavClick(item.id)}
                                className="text-sm font-medium hover:text-primary"
                            >
                                {item.label}
                            </Button>
                        ))}
                    </nav>

                    {/* Theme Toggle & Mobile Menu */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="h-9 w-9"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {/* Mobile Menu */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <nav className="flex flex-col gap-4 mt-8">
                                    {navItems.map((item) => (
                                        <Button
                                            key={item.id}
                                            variant="ghost"
                                            onClick={() => handleNavClick(item.id)}
                                            className="justify-start text-lg"
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};