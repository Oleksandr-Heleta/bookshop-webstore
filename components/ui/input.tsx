import { ComponentPropsWithoutRef, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
    errorMessage?: string;
    label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    function Input({className, errorMessage, label, ...rest }, ref) { // Add display name to the component definition
        const id = useId();
        return (
            <>
                {" "}
                {!!label && <label htmlFor={id}>{label}</label>}
                <input {...rest} ref={ref} className={cn("rounded mb-4 p-1", className)} id={id} />
                {!!errorMessage && <span className="text-red-500">{errorMessage}</span>}
            </>
        );
    }
);

Input.displayName = "Input"; // Set the display name of the component

export default Input;
