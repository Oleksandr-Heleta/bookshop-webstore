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
  function RadioInput({ className, errorMessage, label, imageSrc, handleInputChange, value, isChecked, ...rest }, ref) {
    const id = useId();
 

   

    return (
      <>
       <input {...rest} ref={ref} className='opacity-0 ' id={id} type="radio" value={value} onChange={handleInputChange} />
        {!!label && (
          <label htmlFor={id} className={cn(`text-center bg-white  rounded-md mb-4 border shadow-md p-2 hover:scale-110   hover:opacity-75 transition`, className, { 'border-black border-2': isChecked })}>
            {imageSrc && < Image src={imageSrc} alt={label}  width={100} height={100} />}
            
          </label>
        )}
       
        {!!errorMessage && <span className="text-red-500">{errorMessage}</span>}
      
        
      </>
    );
  }
);

RadioInput.displayName = "RadioInput";

export default RadioInput;
