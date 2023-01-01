import { InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
}

const Checkbox = (props: CheckboxProps) => <input {...props} />;

export default Checkbox;
