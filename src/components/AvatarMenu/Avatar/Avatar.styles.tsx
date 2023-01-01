import styled from "styled-components";

interface SAvatarProps extends React.HTMLProps<HTMLButtonElement> {
  open: boolean;
}

export const SAvatar = styled.button<SAvatarProps>`
  position: absolute;
  top: 5%;
  right: 2rem;
  display: flex;
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: 1px solid lightsalmon;
  border-radius: 50%;
  display: flex;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;

  &:focus {
    outline: none;
    background: ${({ open }: SAvatarProps) => (open ? "white" : "transparent")};
  }

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;
