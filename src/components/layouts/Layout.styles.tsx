import styled from "styled-components";

export const SLayout = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.bg};
  border-radius: 2rem;
`;

export const MainContainer = styled.main`
  overflow-x: auto;
  background-color: #fff;
  position: relative;
  flex-shrink: 1;
  padding: 3rem;
  border-collapse: collapse;
  width: 100%;
  position: relative;
`;

export const MenuWrapper = styled.div`
  overflow-x: hidden;
`;
export const Menu = styled.div`
  border: 2px solid pink;
  display: flex;
  background-color: #dce4ff;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  color: #464646;
  &:focus {
    border: none;
    outline: none;
  }
`;
