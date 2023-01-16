import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.bg};
`;
