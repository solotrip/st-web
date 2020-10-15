import styled from "styled-components/macro";
import { Link as ReachRouterLink } from "react-router-dom";

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;

  background: url(${({ src }) =>
      src
        ? `../images/misc/${src}.jpg`
        : "../images/misc/background1resized.jpg"})
    left / cover no-repeat;

  @media (max-width: 1100px) {
    ${({ dontShowOnSmallViewPort }) =>
      dontShowOnSmallViewPort && `background: cover;`}
  }
`;

export const Container = styled.div`
  display: flex;
  margin: 0 56px;
  height: 64px;
  padding: 18px 0;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
  }

  @media (max-width: 1000px) {
    margin: 0 30px;
  }
`;

export const Link = styled.p`
  color: rgba(60, 60, 60, 1);
  text-decoration: none;
  margin-right: 30px;
  font-weight: ${({ active }) => (active === "true" ? "700" : "normal")};
  cursor: pointer;

  &:hover {
    font-weight: bold;
    transition: font-weight 0s;
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
  width: 390px;

  border-radius: 16px;
  margin-top: 20px;
  display: flex;
  margin-left: 20px;
  margin-rigth: 20px;
`;

export const Searchbar = styled.div`
  background-color: white;
  height: 92px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
`;

export const Search = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  margin-left: px;
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
  width: 84px;
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
  padding: 150px 0 1000px 0;
  flex-direction: column;
  align-items: normal;
  width: 50%;
  margin-bottom: 100px;

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const FeatureContainer = styled.div`
  margin: 0 auto;
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

export const Logo = styled.img`
  margin-top: 120px;
  height: 300px;
  margin-right: 0px;

  filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(68, 81, 92, 0.8));
  @media (min-width: 1449px) {
    height: 45px;
    width: 167px;
  }
`;

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
