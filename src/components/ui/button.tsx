import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

// Manually define variants to avoid cva types issues
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary"
type ButtonSize = "default" | "sm" | "lg" | "icon" | "md"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    variant?: ButtonVariant
    size?: ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        // Manual class mapping
        let variantClass = "bg-primary text-primary-foreground hover:bg-primary/90"
        if (variant === "destructive") variantClass = "bg-destructive text-destructive-foreground hover:bg-destructive/90"
        else if (variant === "outline") variantClass = "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        else if (variant === "secondary") variantClass = "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        else if (variant === "ghost") variantClass = "hover:bg-accent hover:text-accent-foreground"
        else if (variant === "link") variantClass = "text-primary underline-offset-4 hover:underline"
        else if (variant === "primary") variantClass = "bg-primary text-white hover:shadow-lg hover:opacity-90 shadow-sm shadow-primary/20"

        let sizeClass = "h-10 px-4 py-2"
        if (size === "sm") sizeClass = "h-9 rounded-md px-3"
        else if (size === "lg") sizeClass = "h-11 rounded-md px-8"
        else if (size === "icon") sizeClass = "h-10 w-10"
        else if (size === "md") sizeClass = "h-10 px-4 py-2"

        return (
            <Comp
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variantClass,
                    sizeClass,
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
