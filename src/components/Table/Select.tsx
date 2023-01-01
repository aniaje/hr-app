import { useState } from "react";
import styled, { css } from "styled-components";
import { variables } from "../../styles/variables";

interface ISelectProps {
  label: string;
  values: string[];
  onChange: (value: string) => void;
}

const SelectContainer = styled.div`
  position: relative;
  margin: 0;
`;

const SelectLabelButton = styled.button`
  padding: 0.3rem 0.5rem;
  min-width: 7rem;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: #fff;
  border: none;
  border-radius: ${variables.borderRadius};
  color: #111;
  text-align: left;
  justify-content: space-between;
  border: 1px solid slategrey;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 #ccc;
  transition: 0.3s ease;
  &:hover {
    background-color: #eee;
  }
`;

interface IDropdownProps {
  isVisible: boolean;
}

const SDropdown = styled.div<IDropdownProps>`
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  max-height: 40vmax;
  min-width: 7rem;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  border-radius: ${variables.borderRadius};
  background: #fafafa;
  border: 1.5px solid slategrey;
  transition: max-height 0.2s ease;
  overflow: scroll;
  ${(p) =>
    p.isVisible !== true &&
    css`
      max-height: 40px;
      visibility: hidden;
    `}
`;

interface IDropdownItemProps {
  active: boolean;
}
const DropdownItem = styled.div<IDropdownItemProps>`
  display: flex;
  text-align: left;
  width: 90%;
  margin: 0.15rem 0;
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: #333;
  border-radius: ${variables.borderRadius};
  cursor: pointer;
  ${(p) =>
    p.active &&
    css`
      color: #233243;
      font-weight: 500;
    `}
  &:hover, :focus, :focus:hover {
    background-color: #bdccde;
    color: #fafafa;
    outline: none;
  }
`;

const Select = ({ label, values, onChange }: ISelectProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleValueChange = (value: string) => {
    setCurrentValue(value);
  };
  const handleChange = (value: string) => {
    handleValueChange(value);
    if (onChange) onChange(value);
    handleClose();
  };

  return (
    <SelectContainer>
      <SelectLabelButton onClick={handleOpen}>
        {currentValue !== "" ? currentValue : label}
      </SelectLabelButton>
      <SDropdown isVisible={open}>
        {values.map((value, index) => (
          <DropdownItem
            onClick={() => handleChange(value)}
            active={value === currentValue}
            key={index}
          >
            {value}
          </DropdownItem>
        ))}
      </SDropdown>
    </SelectContainer>
  );
};

export default Select;
