import React from "react";

import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsPeople, BsListStars, BsCalendar3 } from "react-icons/bs";

import { useLocation } from "react-router-dom";
import {
  SDivider,
  SLink,
  SLinkContainer,
  SLinkIcon,
  STitle,
  SLinkLabel,
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

interface Settings {
  icon?: React.ReactNode;
  to: string;
  label: string;
}

const secondaryLinksArray: Settings[] = [
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
      <STitle>HR App</STitle>

      <SDivider />
      {linksArray.map(({ icon, label, to }) => (
        <SLinkContainer key={label} isActive={pathname === to}>
          <SLink to={to}>
            <SLinkIcon>{icon}</SLinkIcon>
            <SLinkLabel>{label}</SLinkLabel>
          </SLink>
        </SLinkContainer>
      ))}
      <SDivider />
      {secondaryLinksArray.map(({ icon, label, to }) => (
        <SLinkContainer key={label} isActive={pathname === to}>
          <SLink to={to}>
            <SLinkIcon>{icon}</SLinkIcon>
            <SLinkLabel>{label}</SLinkLabel>
          </SLink>
        </SLinkContainer>
      ))}
      <SDivider />
    </SSidebar>
  );
};

export default Sidebar;
