import styled from "styled-components";
import { variables } from "../../styles/variables";

export const Table = styled.table`
  width: 70%;

  border-collapse: collapse;
  text-align: left;
  border-radius: ${variables.borderRadius};
  overflow: hidden;

  &.span {
    color: red;
  }
`;

interface ActionButtonProps {
  onClick?: (e: Event) => void;
  id?: number;
}

export const ActionButton = styled.button<ActionButtonProps>`
  border: none;
  outline: none;
  color: #111;

  background-color: transparent;
  a {
    color: #0035c5;
    text-decoration: none !important;
    cursor: pointer;
  }
  :hover,
  a:hover {
    color: #c58600;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const TableInput = styled.input`
  padding: 0.3rem 0.5rem;
  min-width: 7rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #fff;
  border: none;
  border-radius: ${variables.borderRadius};
  color: #111;
  align-items: center;
  justify-content: space-between;
  border: 1px solid slategrey;
  margin-left: 0.5rem;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 #ccc;
  transition: 0.3s ease;
  &:hover {
    background-color: #eee;
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.text2};
  }
`;

export const TableInputs = styled.div`
  display: flex;
`;

export const THead = styled.thead``;

export const THeadTR = styled.tr`
  background: ${({ theme }) => theme.bg3};
`;

export const TH = styled.th`
  font-weight: normal;
  padding: ${variables.smSpacing};
  color: ${({ theme }) => theme.text};
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
  :not(:last-of-type) {
    border-right: 1px solid ${({ theme }) => theme.bg2};
  }
  :first-of-type {
    max-width: 1rem;
  }

  & > button {
    border: none;
    outline: transparent;
  }
`;

export const TBody = styled.tbody``;

export const TBodyTR = styled.tr`
  background: ${({ theme }) => theme.white};
`;

export const TD = styled.td`
  padding: ${variables.smSpacing};
  border: 1px solid ${({ theme }) => theme.bg2};
  font-size: 14px;
`;
