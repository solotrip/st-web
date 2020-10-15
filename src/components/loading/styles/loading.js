import styled, { createGlobalStyle } from "styled-components";

export const LockBody = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

export const ReleaseBody = createGlobalStyle`
  body {
    overflow: visible;
  }
`;

export const Spinner = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  z-index: 999;

  background: url(${({ src }) =>
      src
        ? `../images/misc/${src}.jpg`
        : "../images/misc/background1resized.jpg"})
    left / cover no-repeat;

  @media (max-width: 1100px) {
    ${({ dontShowOnSmallViewPort }) =>
      dontShowOnSmallViewPort && `background: cover;`}
  }

  :after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    background-image: url(/images/misc/spinner2.png);
    background-size: contain;
    background-repeat: no-repeat;
    margin-top: -150px;
    margin-left: -75px;
    width: 150px;
    height: 150px;
    animation-name: spin;
    animation-duration: 1500ms;
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
  }

  @-ms-keyframes spin {
    from {
      -ms-transform: rotate(-90deg);
    }
    to {
      -ms-transform: rotate(180deg);
    }
  }

  @-moz-keyframes spin {
    from {
      -moz-transform: rotate(180deg);
    }
    to {
      -moz-transform: rotate(90deg);
    }
  }

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Picture = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -22px;
`;
