import { FC } from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (val: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <input
    className="group size-15 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white"
      checked={checked}
      type="checkbox"
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

export default Checkbox;