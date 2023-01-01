import styled from "styled-components";

const PagiContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const Page = styled.button<{ active?: boolean }>`
  color: darkblue;
  height: 1.2rem;
  width: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 0.05rem grey;
  font-size: 0.6rem;
  background: ${({ active }) => active && "white"};
  border-radius: 0.3rem;
  font-weight: ${({ active }) => active && "bold"};
  cursor: pointer;
`;

const PagArrow = styled.button<{ active?: boolean }>`
  color: darkblue;
  height: 1.2rem;
  width: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  outline: none;
  border: none;
  font-weight: ${({ active }) => active && "bold"};
  cursor: pointer;
`;

export { PagiContainer, Page, PagArrow };
