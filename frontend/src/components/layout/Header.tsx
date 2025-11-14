import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Moon, Sun, Menu, LogIn, LogOut, User } from 'lucide-react';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { useAuth } from '@/hooks/useAuth';

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
    const location = useLocation();
    const { user, isAuthenticated, logout, isLogoutPending } = useAuth();
    const isMainPage = location.pathname === '/';

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
                        <Link to="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
                            Your App
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {isMainPage && (
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
                    )}

                    {/* Auth & Theme Toggle & Mobile Menu */}
                    <div className="flex items-center gap-2">
                        {/* Authentication Buttons */}
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center gap-2">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted/50">
                                    <User className="h-4 w-4" />
                                    <span className="text-sm font-medium">{user?.name || user?.email}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={logout}
                                    disabled={isLogoutPending}
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    {isLogoutPending ? 'Logging out...' : 'Logout'}
                                </Button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-2">
                                <Button asChild variant="ghost" size="sm">
                                    <Link to="/login">
                                        <LogIn className="h-4 w-4 mr-2" />
                                        Sign In
                                    </Link>
                                </Button>
                                <Button asChild size="sm">
                                    <Link to="/signup">Sign Up</Link>
                                </Button>
                            </div>
                        )}

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
                                    {/* Navigation Items (only on main page) */}
                                    {isMainPage && navItems.map((item) => (
                                        <Button
                                            key={item.id}
                                            variant="ghost"
                                            onClick={() => handleNavClick(item.id)}
                                            className="justify-start text-lg"
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                    
                                    {/* Auth Items for Mobile */}
                                    <div className="mt-6 pt-6 border-t space-y-3">
                                        {isAuthenticated ? (
                                            <>
                                                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50">
                                                    <User className="h-4 w-4" />
                                                    <span className="text-sm font-medium">{user?.name || user?.email}</span>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => {
                                                        logout();
                                                        setMobileMenuOpen(false);
                                                    }}
                                                    disabled={isLogoutPending}
                                                    className="justify-start w-full"
                                                >
                                                    <LogOut className="h-4 w-4 mr-2" />
                                                    {isLogoutPending ? 'Logging out...' : 'Logout'}
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button asChild variant="ghost" className="justify-start w-full">
                                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                                        <LogIn className="h-4 w-4 mr-2" />
                                                        Sign In
                                                    </Link>
                                                </Button>
                                                <Button asChild className="justify-start w-full">
                                                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};