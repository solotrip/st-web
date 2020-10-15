import styled from "styled-components/macro";

import { Link as ReactRouterLink } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 510px;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px;
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  max-width: 450px;
  padding: 60 68px 40px;
  margin-bottom: 100px;
`;

export const Error = styled.div`
  background: #e87c03;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 0 16px;
  color: white;
  padding: 15px 20px;
`;

export const Base = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 20px;
`;

export const Title = styled.h1`
  color: #3c3c3c;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 28px;
  margin-left: 20px;
`;

export const Text = styled.p`
  color: #4d4d4d;
  font-size: 16px;
  font-weight: 500;
  margin-left: 20px;
`;

export const TextSmall = styled.p`
  margin-top: 10px;
  font-size: 13px;
  line-height: normal;
  color: #8c8c8c;
  margin-left: 20px;
`;

export const Link = styled(ReactRouterLink)`
  color: #3c82eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Input = styled.input`
  background: #c2c2c2;
  border-radius: 16px;
  border: 0;
  color: #4d4d4d;
  height: 50px;
  line-height: 50px;
  padding: 5px 20px;
  margin-bottom: 20px;

  &: last-of-type {
    margin-bottom: 30px;
  }
`;

export const Submit = styled.button`
  background: #3c82eb;
  border-radius: 16px;
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0 12px;
  padding: 16px;
  border: 0;
  color: white;
  cursor: pointer;

  &: disabled {
    opacity: 0.5;
  }
`;

export const Submit2 = styled.button`
  background-image: linear-gradient(
    to right,
    #ed4264 0%,
    #ffedbc 51%,
    #ed4264 100%
  );
  margin: 0px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;

  &: disabled {
    opacity: 0.5;
  }

  &: enabled {
    &:hover {
      background-position: right center;
      color: #fff;
      text-decoration: none;
    }
  }
`;
