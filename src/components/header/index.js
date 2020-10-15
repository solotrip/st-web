import React, { useState } from "react";
//import { Container } from "../jumbotron/styles/jumbotron";

import { Link as ReactRouterLink } from "react-router-dom";

import {
  Background,
  Container,
  Logo,
  Group,
  ButtonLink,
  Feature,
  Text,
  FeatureCallOut,
  Link,
  Picture,
  Profile,
  Dropdown,
  Search,
  SearchIcon,
  SearchInput,
  FeatureContainer,
  Searchbar,
  Link2,
} from "./styles/header";

export default function Header({ bg = true, children, ...restProps }) {
  return bg ? <Background {...restProps}>{children}</Background> : { children };
}

Header.Feature = function HeaderFeature({ children, ...restProps }) {
  return <Feature {...restProps}>{children}</Feature>;
};

Header.FeatureCallOut = function HeaderFeatureCallOut({
  children,
  ...restProps
}) {
  return <FeatureCallOut {...restProps}>{children}</FeatureCallOut>;
};

Header.FeatureContainer = function HeaderFeatureContainer({
  children,
  ...restProps
}) {
  return <FeatureContainer {...restProps}>{children}</FeatureContainer>;
};

Header.Profile = function HeaderProfile({ children, ...restProps }) {
  return <Profile {...restProps}>{children}</Profile>;
};

Header.Picture = function HeaderPicture({ src, ...restProps }) {
  return <Picture {...restProps} src={`/images/users/${src}.png`}></Picture>;
};

Header.Text = function HeaderText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Header.Searchbar = function HeaderSearchbar({ children, ...restProps }) {
  return <Searchbar {...restProps}>{children}</Searchbar>;
};

Header.Search = function HeaderSearch({
  searchTerm,
  setSearchTerm,
  ...restProps
}) {
  const [searchActive, setsearchActive] = useState(false);

  return (
    <Search {...restProps}>
      <SearchInput
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        //onClick={() => setsearchActive((searchActive) => !searchActive)}
        placeholder="Search anywhere or anything"
        active={searchActive}
      />
    </Search>
  );
};

Header.Dropdown = function HeaderDropdown({ children, ...restProps }) {
  return <Dropdown {...restProps}>{children}</Dropdown>;
};

Header.TextLink = function HeaderTextLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Header.TextLink2 = function HeaderTextLink2({ children, ...restProps }) {
  return <Link2 {...restProps}>{children}</Link2>;
};

Header.Frame = function HeaderFrame({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Header.Group = function HeaderGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Header.ButtonLink = function HeaderButtonLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>;
};

Header.Logo = function HeaderLogo({ to, ...restProps }) {
  return (
    <ReactRouterLink to={to}>
      <Logo {...restProps} />
    </ReactRouterLink>
  );
};

Header.FeautureContainer = function HeaderFeatureContainer({
  children,
  ...restProps
}) {
  return <FeatureContainer {...restProps}>{children}</FeatureContainer>;
};
