import React from 'react';
import { cn } from '../utils';

interface GradientBeamButtonProps {
    children: React.ReactNode;
    href?: string;
    className?: string;
    onClick?: () => void;
}

export const GradientBeamButton = ({ children, href, className, onClick }: GradientBeamButtonProps) => {
    const buttonClasses = cn(
        "relative group inline-flex items-center justify-center px-6 py-2.5 rounded-full overflow-hidden transition-all duration-300",
        "bg-white text-black text-xs font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
        className
    );

    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href as string}
            onClick={onClick}
            className={buttonClasses}
        >
            {/* The Gradient Beam Effect */}
            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#3b82f6_180deg,transparent_240deg,transparent_360deg)]" />
            </div>

            {/* Inner masking to keep the border look */}
            <div className="absolute inset-[1.5px] bg-white rounded-full z-[1]" />

            {/* Content with high z-index */}
            <div className="relative z-20 flex items-center justify-center text-black">
                {children}
            </div>
        </Component>
    );
};
