import styled from "styled-components/macro";
import { Link as ReachRouterLink } from "react-router-dom";

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  height: 650px;
  position: relative;
  animation: change 10s ease-in infinite;

  overflow: hidden;
  margin: 0 0 -100px 0;
  background: url(${({ src }) =>
      src
        ? `../images/misc/${src}.jpg`
        : "../images/misc/background1resized2xx.png"})
    left / cover no-repeat;

  @media (max-width: 1200px) {
    ${({ dontShowOnSmallViewPort }) =>
      dontShowOnSmallViewPort && `background: cover;`}
  }

  /*@keyframes change {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 50% 100%;
    }
    100% {
      background-position: 0% 50%;
    }
  }*/
`;

export const Container = styled.div``;

export const Link = styled.p`
  color: rgba(60, 60, 60, 1);
  text-decoration: none;
  margin-right: 30px;
  font-weight: ${({ active }) => (active === "true" ? "700" : "normal")};
  cursor: pointer;

  &:hover {
    font-weight: bold;
    transition: font-weight 0.1s;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const Link2 = styled.p`
  margin-right: 30px;
  position: relative;
  display: inline-block;
  font-weight: ${({ active }) => (active === "true" ? "700" : "normal")};
  color: ${({ active }) => (active === "true" ? "white" : "#f3f3f3")};
  overflow: hidden;

  background: linear-gradient(to right, white, white 50%, #f3f3f3 50%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 100%;
  background-position: 100%;

  transition: background-position 275ms ease;

  &:hover {
    background-position: 0 100%;
    font-weight: bold;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  background-color: #eaeaea;
  color: #4d4d4d;
  border: 1px solid white;
  transition: width 0.5s;
  height: 36px;
  font-size: 16px;
  width: 100%;
  box-shadow: 2px 3px 28px 1px rgba(0, 0, 0, 0.1);

  border-radius: 16px;
  margin-top: 20px;
  display: grid;

  margin-vertical: 10;
`;

export const Searchbar = styled.div`
  background-color: white;
  height: 92px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`;

export const Search = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 40px;
  margin-left: 40px;
  svg {
    color: #4d4d4d;
    cursor: pointer;
  }
`;

export const SearchIcon = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;

  img {
    color: red;
    width: 24px;
  }
`;

export const ButtonLink = styled(ReachRouterLink)`
  display: block;
  background: rgba(60, 60, 60, 1);

  height: fit-content;
  color: rgba(234, 234, 234, 1);
  border: 1;
  border-color: white;
  font-size: 15px;
  border-radius: 8px;
  padding: 8px 17px;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  text-align: center;
  margin-left: auto;
  margin-right: 10px;

  &:hover {
    background: #3c82eb;
    color: white;
  }
`;

export const ButtonLink2 = styled(ReachRouterLink)`
  display: block;

  /*background: rgba(169, 97, 109, 1);*/
  background: rgba(234, 234, 234, 1);
  height: fit-content;
  color: rgba(60, 60, 60, 1);
  border: 1;
  border-color: white;
  font-size: 15px;
  border-radius: 8px;
  padding: 8px 17px;
  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
  text-align: center;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background: #3c82eb;
    color: white;
  }
`;

export const Picture = styled.button`
  background: url(${({ src }) => src});
  background-size: contain;
  border: 0;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 16px;
`;

export const Dropdown = styled.div`
  display: none;
  position: absolute;
  background: rgba(243, 243, 243, 1);
  padding: 10px;
  width: 100px;
  top: 32px;
  right: 10px;
  border-radius: 16px;

  ${Group}:last-of-type ${Link} {
    cursor: pointer;
  }

  ${Group} {
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }

    ${Link}, ${Picture} {
      cursor: default;
    }
  }

  button {
    margin-right: 10px;
  }

  p {
    font-size: 12px;
    margin-bottom: 0;
    margin-top: 0;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  position: relative;

  button {
    cursor: pointer;
  }

  &:hover > ${Dropdown} {
    display: flex;
    flex-direction: column;
  }
`;

export const Feature = styled(Container)`
  padding: 0px 0 1000px 0;
  flex-direction: column;
  align-items: normal;
  width: 50%;
  margin-bottom: 100px;

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FeatureCallOut = styled.h2`
  color: white;
  font-size: 24px;
  line-height: normal;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
  margin-top: 110px;
`;

export const Text = styled.p`
  color: white;
  font-size: 22px;
  line-height: normal;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
`;

export const Logo = styled.img``;

export const PlayButton = styled.button`
  box-shadow: 0 0.6vw 1vw -0.4vw rgba(0, 0, 0, 0.35);
  background-color: #e6e6e6;
  color: #000;
  border-width: 0;
  padding: 10px 20px;
  border-radius: 5px;
  max-width: 130px;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #ff1e1e;
    color: white;
  }
`;
