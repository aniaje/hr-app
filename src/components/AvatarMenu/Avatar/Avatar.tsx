import React from "react";
import { useGetUserQuery } from "redux/services/user";
import { SAvatar } from "./Avatar.styles";

interface MenuAvatarProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  onClick?: () => void;
}
const MenuAvatar = ({ open, setOpen }: MenuAvatarProps) => {
  const { data: profile } = useGetUserQuery({});
  const letterName = profile?.firstname.charAt(0).toUpperCase();
  const letterLastname = profile?.lastname.charAt(0).toUpperCase();
  return (
    <SAvatar open={open} onClick={() => setOpen(!open)}>
      {letterName}
      {letterLastname}
    </SAvatar>
  );
};

export default MenuAvatar;
