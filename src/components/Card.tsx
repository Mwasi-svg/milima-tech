import { type ReactNode } from 'react';
import { cn } from '../utils';

interface CardProps {
    children: ReactNode;
    className?: string;
}

export const Card = ({ children, className }: CardProps) => {
    return (
        <div
            className={cn(
                "relative rounded-3xl p-8 overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl border border-white/10 group transition-all duration-500 hover:border-white/20",
                className
            )}
        >
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};
