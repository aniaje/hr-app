import React from "react";

import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsPeople, BsListStars, BsCalendar3 } from "react-icons/bs";

import { useLocation } from "react-router-dom";
import {
  Divider,
  SLink,
  LinkContainer,
  LinkIcon,
  Title,
  LinkLabel,
  SSidebar,
} from "./Sidebar.styles";

interface Link {
  icon?: React.ReactNode;
  label: string;
  to: string;
}
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

const secondaryLinksArray: Link[] = [
  {
    label: "Settings",
    icon: <AiOutlineSetting />,
    to: "/",
  },
];

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();

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
      <Divider />
      {secondaryLinksArray.map(({ icon, label, to }) => (
        <LinkContainer key={label} isActive={pathname === to}>
          <SLink to={to}>
            <LinkIcon>{icon}</LinkIcon>
            <LinkLabel>{label}</LinkLabel>
          </SLink>
        </LinkContainer>
      ))}
      <Divider />
    </SSidebar>
  );
};

export default Sidebar;
