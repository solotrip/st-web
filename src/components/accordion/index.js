import React, { useState, createContext, useContext } from "react";
import {
  Container,
  Frame,
  Title,
  Inner,
  Item,
  Body,
  Header,
} from "./styles/accordion";

const ToggleContext = createContext();

export default function Accordion({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Accordion.Frame = function AccordionFrame({ children, ...restProps }) {
  return <Frame {...restProps}>{children}</Frame>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = useState(false);
  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <Item
        style={{
          boxShadow: toggleShow
            ? "0 1px 4px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.1) inset"
            : "none",
          WebkitBoxShadow: toggleShow
            ? "0 1px 4px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.1) inset"
            : "none",
          MozBoxShadow: toggleShow
            ? "0 1px 4px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.1) inset"
            : "none",
        }}
        {...restProps}
      >
        {children}
      </Item>
    </ToggleContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);
  return (
    <Header
      onClick={() => setToggleShow((toggleShow) => !toggleShow)}
      {...restProps}
      style={{
        color: toggleShow ? "black" : "rgb(60,60,60)",
        fontWeight: toggleShow ? "bold" : "normal",
      }}
    >
      {children}
      {
        //{toggleShow ? (
        // <img
        //  src="/images/icons/chevron-right.png"
        //  style={{ transform: `rotate(${90}deg)` }}
        // alt="Close"
        //  />
        // ) : (
        //   <img src="images/icons/chevron-right.png" alt="Open" />
        // )}
      }
    </Header>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { toggleShow } = useContext(ToggleContext);

  return toggleShow ? <Body {...restProps}>{children} </Body> : null;
};