import styled from "styled-components";

export const Toggle = styled.button`
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  margin: 1rem;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.textSecondary2Fade};
  color: ${({ theme }) => theme.textSecondary2};
  &:focus {
    outline: none;
  }
  transition: all 0.5s ease;
`;
