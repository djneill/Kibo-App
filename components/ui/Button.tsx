'use client';

import Spinner from "@/components/ui/Spinner";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
  secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
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
      "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors cursor-pointer disabled:cursor-not-allowed",
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
