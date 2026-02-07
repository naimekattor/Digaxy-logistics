import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Shield, Crown } from 'lucide-react';
import Image from 'next/image';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-gold text-white hover:bg-brand-accent shadow-md',
      outline: 'border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
    };

    const sizes = {
      default: 'px-4 py-3 text-sm',
      sm: 'px-3 py-2 text-xs',
      lg: 'px-6 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-50 w-full',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <input
          className={cn(
            'flex h-12 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// --- Card ---
export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'rounded-2xl border border-gray-100 bg-white text-gray-950 shadow-sm',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// --- Badge ---
export const Badge = ({ className, variant = 'default', children }: { className?: string, variant?: 'default' | 'success' | 'warning', children: React.ReactNode }) => {
    const variants = {
        default: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800"
    };
    return (
        <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)}>
            {children}
        </span>
    )
}

// --- Toggle Switch ---
interface ToggleProps {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    label?: string;
}

export const Toggle = ({ enabled, onChange, label }: ToggleProps) => (
    <div className="flex items-center gap-3">
        {label && <span className="text-sm font-medium text-gray-900">{label}</span>}
        <button
            type="button"
            className={cn(
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2",
                enabled ? "bg-brand-gold" : "bg-gray-200"
            )}
            role="switch"
            aria-checked={enabled}
            onClick={() => onChange(!enabled)}
        >
            <span
                aria-hidden="true"
                className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    enabled ? "translate-x-5" : "translate-x-0"
                )}
            />
        </button>
    </div>
);

// --- Logo ---
export const Logo = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center gap-3", className)}>
        <div className="relative flex items-center justify-center">
            <Image src={"/images/logo.png"} alt='logo' width={42} height={39}/>
        </div>
        <div className="flex flex-col items-start leading-none">
            <span className="text-3xl font-serif font-bold tracking-widest text-brand-gold">DIGAXY</span>
            <span className="text-[7px] tracking-[4px] font-bold text-gray-400 block -mt-0.5">YOUR MOVE • OUR PRIORITY</span>
        </div>
    </div>
);

// --- Accordion ---
interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onClick?: () => void;
}

export const AccordionItem = ({ title, children, isOpen, onClick }: AccordionItemProps) => {
    return (
        <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden mb-4">
            <button
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                onClick={onClick}
            >
                <span className="font-semibold text-gray-900">{title}</span>
                <span className={cn("transform transition-transform duration-200", isOpen ? "rotate-180" : "")}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </span>
            </button>
            <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                <div className="px-6 pb-5 text-gray-600 text-sm">
                    {children}
                </div>
            </div>
        </div>
    );
};