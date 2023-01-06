import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { useGetUserQuery } from "redux/services/user";
import { removeToken } from "auth/common";
import { Divider } from "../../Sidebar/Sidebar.styles";
import { StyledMenu, Logout } from "./Menu.styles";

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
      <Divider />
      <Link to="/profile">
        <span aria-label="Profile">PROFILE</span>
      </Link>
      <Divider />

      <Logout type="button" aria-label="Logout" onClick={handleLogout}>
        <MdOutlineLogout /> LOG OUT
      </Logout>
    </StyledMenu>
  );
};

export default Menu;
