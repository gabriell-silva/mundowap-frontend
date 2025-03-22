import styled from 'styled-components';
import { ButtonProps } from './type';

export const ButtonStyle = styled.button<ButtonProps>`
  background-color: #4b6eff;
  border-radius: 4px;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`; 