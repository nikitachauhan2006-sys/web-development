import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Layout;