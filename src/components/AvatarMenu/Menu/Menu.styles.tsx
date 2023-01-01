import styled from "styled-components";

interface SMenuProps {
  open: boolean;
  onClick?: () => void;
}

export const StyledMenu = styled.nav<SMenuProps>`
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.bg2};
  display: ${({ open }: SMenuProps) => (open ? "block" : "none")};
  height: max-content;
  text-align: left;
  padding: 1rem;
  position: absolute;
  top: 10%;
  right: 0;
  margin-top: 1rem;
  overflow-x: hidden;
  transition: transform 0.3s ease-in-out;
  border-radius: 1rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
  span {
    padding-left: 0.5rem;
    vertical-align: middle;
  }

  a {
    font-size: 1rem;
    padding: 0.5rem 0;
    font-weight: bold;
    letter-spacing: 0.1rem;
    color: ${({ theme }) => theme.text2};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.textDark};
    }
  }
`;

export const SLogout = styled.button`
  display: flex;
  width: 100%;
  background: whitesmoke;
  border: none;
  border-radius: 5px;
  display: flex;
  font-size: 0.8rem;
  justify-content: space-around;
  font-weight: lighter;
  color: ingerit
  align-items: center;
  padding: 0.3rem;
  cursor: pointer;

  &:after {
    content: "";
    display: block;
  }
`;
