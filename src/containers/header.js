import React from "react";

import { Header } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../constants/SolotripLogo2.png";
//import logo from "../../src/logo.svg";

export function HeaderContainer({ children }) {
  return (
    <Header>
      <Header.Frame>
        <Header.Logo to={ROUTES.HOME} alt="Solotrip" src={logo} />
        <Header.ButtonLink to={ROUTES.SIGN_IN}> Login </Header.ButtonLink>
      </Header.Frame>
      {children}
    </Header>
  );
}
