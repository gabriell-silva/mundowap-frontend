import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

export const ProgressbarWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 20px;
  border-radius: 4px;
  background-color: transparent;
  overflow: hidden;
`;

export const ProgressbarBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #10101010;
  border-radius: 4px;
`;

export const ProgressbarFill = styled.div`
  height: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  animation: ${loadingAnimation} 2s infinite;
`;

export const ProgressText = styled.span`
  position: absolute;
  right: 10px;
  color: #555;
  font-weight: bold;
  font-size: 12px;
`;
