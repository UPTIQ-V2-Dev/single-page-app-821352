import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

export const MainPage = () => {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <AboutSection />
            <ContactSection />
        </>
    );
};