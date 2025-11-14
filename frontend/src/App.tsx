import { AppProviders } from '@/providers/AppProviders';
import { AppLayout } from '@/components/layout/AppLayout';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

export const App = () => {
    return (
        <AppProviders>
            <AppLayout>
                <HeroSection />
                <FeaturesSection />
                <AboutSection />
                <ContactSection />
            </AppLayout>
        </AppProviders>
    );
};
