import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { FAQ } from '../components/FAQ';
import { PlatformCTA } from '../components/PlatformCTA';

export const HomePage = () => {
    return (
        <div className="w-full">
            <Hero />
            <Features />
            <PlatformCTA />
            <FAQ />
        </div>
    );
};
