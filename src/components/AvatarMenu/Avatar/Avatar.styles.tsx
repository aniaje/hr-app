import styled from "styled-components";

interface AvatarProps extends React.HTMLProps<HTMLButtonElement> {
  open: boolean;
}

export const Avatar = styled.button<AvatarProps>`
  position: absolute;

  top: 3%;
  right: 3%;
  display: flex;
  width: 3rem;
  height: 3rem;
  background-color: ${({ theme }) => theme.bg3};
  border: 1px solid lightsalmon;
  border-radius: 50%;
  display: flex;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 1.8rem;
    height: 1.8rem;
  }

  &:focus {
    outline: none;
    background: ${({ open }: AvatarProps) => (open ? "white" : "transparent")};
  }

  &:hover {
    outline: none;
    background-color: white;
  }

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;
