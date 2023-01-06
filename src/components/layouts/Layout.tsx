import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useOnClickOutside } from "../../hooks";
import Sidebar from "../Sidebar/Sidebar";
import { SLayout, MainContainer, MenuWrapper } from "./Layout.styles";
import MenuAvatar from "../AvatarMenu/Avatar/Avatar";
import Menu from "../AvatarMenu/Menu/Menu";

const Layout = () => {
  const [open, setOpen] = useState<boolean>(false);

  const node = useRef<HTMLDivElement>(null);
  useOnClickOutside(node, () => setOpen(false));

  return (
    <SLayout>
      <Sidebar />
      <MainContainer>
        <Outlet />
        <div ref={node}>
          <MenuAvatar open={open} setOpen={setOpen} />
          <MenuWrapper>
            <Menu
              open={open}
              setOpen={function (state: boolean): void {
                throw new Error("Function not implemented.");
              }}
            />
          </MenuWrapper>
        </div>
      </MainContainer>
    </SLayout>
  );
};

export default Layout;
