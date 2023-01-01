import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { useGetUserQuery } from "redux/services/user";
import { removeToken } from "auth/common";
import { SDivider } from "../../Sidebar/Sidebar.styles";
import { StyledMenu, SLogout } from "./Menu.styles";

interface MenuProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  onClick?: () => void;
}

const Menu = ({ open, setOpen, onClick }: MenuProps) => {
  const navigate = useNavigate();

  const { data: profile } = useGetUserQuery({});

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <StyledMenu open={open} onClick={() => setOpen(!open)}>
      <span aria-label="User">{profile?.firstname}</span>
      <span aria-label="User">{profile?.lastname}</span>
      <SDivider />
      <Link to="/profile">
        <span aria-label="Profile">PROFILE</span>
      </Link>
      <SDivider />

      <SLogout type="button" aria-label="Logout" onClick={handleLogout}>
        <MdOutlineLogout /> LOG OUT
      </SLogout>
    </StyledMenu>
  );
};

export default Menu;
