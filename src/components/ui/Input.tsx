import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-foreground/80"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`
            rounded-lg border bg-white/5 px-4 py-2.5 text-sm text-foreground
            placeholder:text-foreground/40 outline-none transition
            focus:ring-2 focus:ring-brand-violetLight/50
            ${error ? "border-red-500/50" : "border-white/10 focus:border-brand-violetLight/50"}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
