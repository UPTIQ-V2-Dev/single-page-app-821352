import { Heart } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Your App</h3>
                        <p className="text-muted-foreground text-sm">
                            Building amazing experiences with modern web technologies.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#hero" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social & Legal */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
                            Legal
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Your App. All rights reserved.
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> using React 19
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};