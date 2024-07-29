import { ComponentPropsWithoutRef, forwardRef, useId, useState, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import Image from 'next/image';

interface RadioInputProps extends ComponentPropsWithoutRef<"input"> {
  errorMessage?: string;
  label?: string;
  imageSrc?: string;
  handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  isChecked?: boolean;
}

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  function RadioInput({ className, errorMessage, label, imageSrc, handleInputChange, value, isChecked, disabled, ...rest }, ref) {
    const id = useId();
 

   

    return (
      <div className="flex ">
       <input disabled={disabled} {...rest} ref={ref} className="opacity-0 -mr-3" id={id} type="radio" value={value} onChange={handleInputChange} />
        {!!label && (
          <label htmlFor={id} className={cn(`text-center bg-white  rounded-md mb-2 border shadow-md p-2 hover:scale-110   hover:opacity-75 transition`,  { 'border-amber-800 border-2': isChecked }, {'opacity-50 text-gray-500': disabled})}>
            {imageSrc && < Image src={imageSrc} alt={label}  width={100} height={100} />}
            <span className={className}>{label}</span>
          </label>
        )}
       
        {!!errorMessage && <span className="text-red-500">{errorMessage}</span>}
      
        
      </div>
    );
  }
);

RadioInput.displayName = "RadioInput";

export default RadioInput;
