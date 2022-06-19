import React from "react";
import "./topbar.css";
import { useSelector } from "react-redux";
import AccountMenu from "./AccountMenu"

export default function Topbar() {
  const user = useSelector((state) => state?.user?.currentUser?.username);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">AgriPortal</span>
        </div>
        <div className="topRight">

          <div className="topbarIconContainer">
            <AccountMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
