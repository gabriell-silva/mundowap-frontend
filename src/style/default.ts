import styled from "styled-components";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Box = styled.div`
  width: "100%",
`;

export {
  FlexColumn,
  FlexRow,
  Box
}