import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

import { variables } from "../../styles/variables";

export const SSidebar = styled.nav`
  width: fit-content;
  flex-shrink: 0;
  background-color: #fff;
  height: 100vh;
  padding-top: 1rem;
  position: relative;
  overflow-x: hidden;
  * {
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
`;

export const STitle = styled.h3`
  text-align: center;
`;

export const SDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.bg3};
  margin: ${variables.lgSpacing} 0;
`;

interface SLinkContainerProps {
  isActive: boolean;
  key: string;
}
export const SLinkContainer = styled.div<SLinkContainerProps>`
  background: ${({ theme, isActive }) =>
    !isActive ? `transparent` : theme.bg3};
  border-radius: ${variables.borderRadius};
  margin: 8px 0;
  :hover {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.bg3};
  }
`;

export const SLink = styled(Link)`
  display: flex;
  position: relative;
  white-space: nowrap;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 16px;
  cursor: pointer;
  padding: calc(${variables.smSpacing} - 2px) 0;
  &:hover {
    color: black;
  }
`;

export const SLinkIcon = styled.div`
  padding: ${variables.smSpacing} ${variables.mdSpacing};
  display: flex;
  svg {
    font-size: 20px;
  }
`;

export const SLinkLabel = styled.span`
  display: block;
  color: black;
  flex: 1;
  margin: ${variables.smSpacing};
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;
