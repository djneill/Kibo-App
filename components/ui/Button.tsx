'use client';

import Spinner from "@/components/ui/Spinner";

type ButtonVariant = "primary" | "secondary" | "danger" | "icon";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#00b4d8] text-white hover:bg-[#12d8ff] shadow-[0_4px_0_0_#008fab] active:shadow-[0_0px_0_0_#008fab] active:translate-y-1 disabled:bg-[#ade8f4] disabled:shadow-none",
  secondary: "bg-white text-gray-800 border-2 border-gray-200 hover:border-gray-300 shadow-[0_4px_0_0_#e5e7eb] active:shadow-[0_0px_0_0_#e5e7eb] active:translate-y-1 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none",
  danger: "bg-red-500 text-white hover:bg-red-600 shadow-[0_4px_0_0_#b91c1c] active:shadow-[0_0px_0_0_#b91c1c] active:translate-y-1",
  icon: "bg-[#f3f4f6] text-gray-800 hover:bg-[#e5e7eb] shadow-[0_4px_0_0_#d1d5db] active:shadow-[0_0px_0_0_#d1d5db] active:translate-y-1",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  icon: "w-12 h-12 p-0",
};

const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) => (
  <button
    type="button"
    disabled={disabled || isLoading}
    aria-busy={isLoading}
    aria-disabled={disabled || isLoading}
    className={[
      "font-fredoka inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-wide transition-all cursor-pointer disabled:cursor-not-allowed",
      variantClasses[variant],
      sizeClasses[size],
      className,
    ].join(" ")}
    {...props}
  >
    {isLoading && <Spinner />}
    {children}
  </button>
);

export default Button;
