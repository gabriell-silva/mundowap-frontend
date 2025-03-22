import { FieldError } from "react-hook-form";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string | undefined;
  name: string;
  error?: FieldError | null | undefined;
  isDisabled?: boolean | undefined;
};
