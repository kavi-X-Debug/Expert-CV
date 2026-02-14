import * as React from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "checked">;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, checked = false, onCheckedChange, disabled, ...props }, ref) => {
        return (
            <input
                ref={ref}
                type="checkbox"
                className={cn(
                    "h-4 w-4 rounded border border-input bg-background ring-offset-background",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                checked={checked}
                onChange={(e) => onCheckedChange?.(e.target.checked)}
                disabled={disabled}
                {...props}
            />
        );
    }
);
Checkbox.displayName = "Checkbox";

