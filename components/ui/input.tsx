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
                <input {...rest} ref={ref} className={cn(" mt-2 p-1 block flex-1 border-1 rounded-full bg-white w-full py-1.5 pl-2 text-amber-950 shadow-md placeholder:text-gray-400 focus:ring-0 focus-visible:border-amber-800 sm:text-sm sm:leading-6", className)} id={id} />
                {!!errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
            </>
        );
    }
);

Input.displayName = "Input"; // Set the display name of the component

export default Input;
