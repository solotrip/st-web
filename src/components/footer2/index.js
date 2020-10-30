import React from "react";
import {
  Container,
  Row,
  Column,
  Link,
  Text,
  Break,
  Title,
} from "./styles/footer2";

export default function Footer2({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Footer2.Row = function FooterRow({ children, ...restProps }) {
  return <Row {...restProps}> {children}</Row>;
};

Footer2.Column = function FooterColumn({ children, ...restProps }) {
  return <Column {...restProps}> {children}</Column>;
};
Footer2.Link = function FooterLink({ children, ...restProps }) {
  return <Link {...restProps}> {children}</Link>;
};

Footer2.Title = function FooterTitle({ children, ...restProps }) {
  return <Title {...restProps}> {children}</Title>;
};

Footer2.Text = function FooterText({ children, ...restProps }) {
  return <Text {...restProps}> {children}</Text>;
};

Footer2.Break = function FooterBreak({ children, ...restProps }) {
  return <Break {...restProps}> {children}</Break>;
};
