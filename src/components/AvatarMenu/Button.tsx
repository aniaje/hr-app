import styled from "styled-components";

export const StyledSubmitInput = styled.button`
  font-size: 1rem;
  font-weight: 200;
  background-color: lightsalmon;
  color: ${({ theme }) => theme.text2};
  padding: 0.7rem 1.5rem;
  width: 100%;
  margin: 5px 0;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border: none;
  -webkit-box-shadow: -1px 12px 28px -8px rgba(66, 68, 90, 1);
  -moz-box-shadow: -1px 12px 28px -8px rgba(66, 68, 90, 1);
  box-shadow: -1px 12px 28px -8px lightsalmon;
  text-transform: uppercase;
  cursor: pointer;
  transform: 0.2s;
  &:active {
    background-color: salmon;
  }
`;

const StyledButton = styled.button`
  font-size: 1rem;
  font-weight: 200;
  background-color: lightsalmon;
  color: ${({ theme }) => theme.text2};
  padding: 0.7rem 1.5rem;
  width: 100%;
  margin: 5px 0;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border: none;
  -webkit-box-shadow: -1px 12px 28px -8px rgba(66, 68, 90, 1);
  -moz-box-shadow: -1px 12px 28px -8px rgba(66, 68, 90, 1);
  box-shadow: -1px 12px 28px -8px lightsalmon;
  text-transform: uppercase;
  cursor: pointer;
  transform: 0.2s;

  &:hover {
    background-color: salmon;
  }
`;

interface ButtonProps {
  onClick?: React.MouseEventHandler;
  buttonText: string;
}

export const Button = ({ onClick, buttonText }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} type="button">
      {buttonText}
    </StyledButton>
  );
};

export default StyledButton;
