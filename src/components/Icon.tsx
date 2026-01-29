import { Icon as IconifyIcon } from '@iconify/react';
import { cn } from '../utils';

interface IconProps {
    icon: string;
    className?: string;
}

export const Icon = ({ icon, className }: IconProps) => (
    <IconifyIcon
        icon={icon}
        className={cn("text-[1.5em]", className)}
    />
);
