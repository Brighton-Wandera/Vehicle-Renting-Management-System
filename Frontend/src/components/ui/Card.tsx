import React from 'react';
import { cn } from '../../utils/helpers';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'gradient';
    hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', hover = true, children, ...props }, ref) => {
        const variants = {
            default:
                'bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border shadow-lg',
            glass: 'glass shadow-glass',
            gradient: 'bg-gradient-to-br from-primary-500 via-accent-500 to-pink-500 text-white',
        };

        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl p-6 transition-all duration-300',
                    variants[variant],
                    hover && 'hover:shadow-xl hover:-translate-y-1',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export default Card;
