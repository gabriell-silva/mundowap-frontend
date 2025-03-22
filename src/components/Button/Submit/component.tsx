import { ButtonProps } from '../type';
import { ButtonStyle } from '../style';

export default function ButtonSubmit({ onClick, form, disabled, children, ...props }: ButtonProps) {
  return (
    <ButtonStyle
      type={"submit"}
      form={form}
      disabled={disabled}
      {...props}
    >
      {children}
    </ButtonStyle>
  )
}