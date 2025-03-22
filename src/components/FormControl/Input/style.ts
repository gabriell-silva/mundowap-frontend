import styled from "styled-components";

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FormErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

const InputStyle = styled.input`
  cursor: ${props =>props.disabled ? "not-allowed" : "auto"};
  background-color: ${props => props.disabled ? "#10101010" : "#fff"};
  height: 36px;
  border-radius: 4px;
  border: 1px solid #ccc;
  max-width: 100%;
`
export {
  FormControl,
  FormErrorMessage,
  InputStyle
}