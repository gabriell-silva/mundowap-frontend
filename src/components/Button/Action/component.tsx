import { ButtonProps } from '../type';
import { ButtonStyle } from '../style';

export default function ButtonAction({ onClick, disabled, children, ...props }: ButtonProps) {
  return disabled ? (
    <ButtonStyle
      type={"button"}
      disabled={disabled}
      {...props}
    >
      {children}
    </ButtonStyle>
  ) : (
    <ButtonStyle
      type={"button"}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
}