import { Link } from "react-router-dom";
import styled from "styled-components";
import { variables } from "../../styles/variables";

export const SForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.bg2};
  border-radius: ${variables.borderRadius};
  padding: ${variables.mdSpacing};
`;

export const SFormTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const SFormControl = styled.div`
  position: relative;
  :first-of-type {
    margin-top: ${variables.mdSpacing};
  }
  :not(:last-of-type) {
    margin-bottom: ${variables.smSpacing};
  }
`;

export const SShowIcon = styled.button`
  background-color: transparent;
  font-size: 1rem;
  position: absolute;
  right: 1rem;
  top: 30%;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  &:hover {
    color: pink;
  }
`;
export const SCheckbox = styled.input`
  display: inline;
  vertical-align: middle;
`;

export const SCheckboxLabel = styled.label`
  display: inline;
  padding-left: 0.2rem;
  font-size: 0.7rem;
`;

export const SInput = styled.input`
  outline: none;
  position: relative;
  border: 1px solid ${({ theme }) => theme.textFade};
  width: 100%;
  padding: ${variables.smSpacing};
  font-size: 14px;
  margin: 5px 0;
  border-radius: ${variables.borderRadius};
`;

export const SLabel = styled.label`
  position: absolute;
  pointer-events: none;
  left: 20px;
  top: 14px;
  transition: 0.3s ease all;

  ${SInput}:focus ~ & {
    top: 6px;
    left: 5px;
    font-size: 11px;
    opacity: 0.6;
  }
`;

export const SRedirect = styled.div`
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${variables.smSpacing};
`;
export const SRedirectLabel = styled.span`
  color: ${({ theme }) => theme.text2};
`;

export const Error = styled.span`
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: ${variables.smSpacing};
`;

export const SRedirectLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;
