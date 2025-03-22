import styled from "styled-components";

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 0px auto;
`

const Container = styled.div`
  display: block;
  width: 70%;
  margin: 0 auto;
`

const Image = styled.img`
  width: 100px;
  height: 50px;
`

export {
  FlexRow,
  Container,
  Image
}