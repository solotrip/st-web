import React from "react";

import { Header } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../constants/Logox2.png";
//import logo from "../../src/logo.svg";

import "./browse.css";

import Sticky from "react-stickynode";

export function HeaderContainer({ children }) {
  return (
    <div className="mainBackgroundLoginSignup">
      <Header dontShowOnSmallViewPort>
        <Header.Frame className="navbarTop2">
          <Header.Logo
            to={ROUTES.HOME}
            alt="Solotrip"
            src={logo}
            className="mainlogo"
          />
          <Header.Group>
            <Header.ButtonLink to="/signup">🍳 Sunny Sign Up</Header.ButtonLink>
            <Header.ButtonLink2 to="/signin">🤘 Login </Header.ButtonLink2>
          </Header.Group>
        </Header.Frame>
        <div className="logcontent">{children}</div>
      </Header>
    </div>
  );
}
