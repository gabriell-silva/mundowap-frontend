import React from "react";
import { FormControl, FormErrorMessage, InputStyle } from "./style";
import { InputProps } from "./type";
import { FlexColumn } from "../../../style/default";

const InputBase = (
  {
    label,
    name,
    type = "text",
    error = null,
    isDisabled,
    onChange,
    ...rest
  }: InputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  return (
    <FormControl>
      <label>{label}</label>
        
      <FlexColumn>
        <InputStyle
          id={name}
          name={name}
          type={type}
          ref={ref}
          disabled={isDisabled}
          onChange={onChange}
          {...rest}
        />

          {!!error && <FormErrorMessage>
            {error.message}
          </FormErrorMessage>}
      </FlexColumn>
    </FormControl>
  );
}

export default React.forwardRef(InputBase);