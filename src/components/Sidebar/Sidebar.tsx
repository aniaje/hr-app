import React from "react";

import { AiOutlineHome } from "react-icons/ai";
import { Link } from "types";
import { BsPeople, BsListStars, BsCalendar3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { uiActions } from "redux/uiSlice";
import { useLocation } from "react-router-dom";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";
import {
  Divider,
  SLink,
  LinkContainer,
  LinkIcon,
  Title,
  LinkLabel,
  SSidebar,
} from "./Sidebar.styles";
import { Toggle } from "../Toggle.styles";

const linksArray: Link[] = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/dashboard",
  },
  {
    label: "Jobs",
    icon: <BsListStars />,
    to: "/jobs",
  },
  {
    label: "Candidates",
    icon: <BsPeople />,
    to: "/candidates",
  },
  {
    label: "Calendar",
    icon: <BsCalendar3 />,
    to: "/calendar",
  },
];

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.ui);

  const toggleThemeHandler = () => {
    dispatch(uiActions.toggleTheme());
  };

  const themeIcon =
    theme === "light" ? <HiMoon size={16} /> : <CgSun size={16} />;

  return (
    <SSidebar>
      <Title>HR App</Title>

      <Divider />
      {linksArray.map(({ icon, label, to }) => (
        <LinkContainer key={label} isActive={pathname === to}>
          <SLink to={to}>
            <LinkIcon>{icon}</LinkIcon>
            <LinkLabel>{label}</LinkLabel>
          </SLink>
        </LinkContainer>
      ))}

      <Toggle onClick={toggleThemeHandler}>{themeIcon}</Toggle>
      <Divider />
    </SSidebar>
  );
};

export default Sidebar;
