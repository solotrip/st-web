import styled from "styled-components/macro";

export const Title = styled.p`
  font-size: 24px;
  color: #3c3c3c;
  font-weight: regular;
  margin-left: 56px;
  margin-right: 56px;
  margin-top: 20px;
`;

export const Showmore = styled.a`
  font-size: 14px;
  color: #3c3c3c;
  font-weight: light;
  margin: 0 0 10px auto;
  padding-rigth: 10px;
`;

export const ButtonLink = styled.button`
  display: block;
  background: rgba(60, 60, 60, 1);
  height: 20px;
  color: rgba(234, 234, 234, 1);
  border: 0;
  border-color: white;
  font-size: 10px;
  border-radius: 8px;
  margin: auto;

  cursor: pointer;
  text-decoration: none;
  box-sizing: border-box;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  box-sizing: border-box;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  border-radius: 16px;
  max-height: 326px;
  -webkit-box-shadow: 10px 26px 42px -20px rgba(0, 0, 0, 0.56);
  -moz-box-shadow: 10px 26px 42px -20px rgba(0, 0, 0, 0.56);
  box-shadow: 10px 26px 42px -20px rgba(0, 0, 0, 0.56);
  padding-bottom: 30px;
  max-width: 752px;

  > ${Title} {
    @media (max-width: 1000px) {
      margin-left: 30px;
    }
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Group = styled.div`
  display: flex;
  background-color: #f3f3f3;
  flex-direction: ${({ flexDirection }) =>
    flexDirection === "row" ? "row" : "column"};
  ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
  ${({ margin }) => margin && `margin: ${margin}`};

  > ${Container}:first-of-type {
    @media (min-width: 1100px) {
      margin-top: -30px;
    }
  }
`;

export const SubTitle = styled.p`
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  margin-top: 60px;
  margin-bottom: 0;
  user-select: none;
  display: none;
`;

export const Text = styled.p`
  font-size: 10px;
  color: #fff;
  user-select: none;
  display: block;
  line-height: normal;
  margin-top: auto;
  margin-left: 0;
`;

export const Entities = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Meta = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  padding: 10px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  border-radius: 16px;
  ${ButtonLink} {
    background: rgba(0, 0, 0, 0);
    color: transparent;
  }
`;

export const Image = styled.img`
  border: 0;
  width: 100%;
  max-width: 305px;
  cursor: pointer;
  height: auto;
  padding: 0;
  margin: 0;
  border-radius: 16px;
  -webkit-box-shadow: 10px 26px 42px -20px rgba(0, 0, 0, 0.56);
  -moz-box-shadow: 10px 26px 42px -20px rgba(0, 0, 0, 0.56);
  box-shadow: 10px 26px 42px -20px rgba(0, 0, 0, 0.56);
`;

export const Item = styled.div`
  display: block;
  flex-direction: column;
  margin-right: 40px;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;

  ${Text},${SubTitle} {
    display: flex;
  }

  &:hover {
    transform: scale(1.3);
    ${Meta} {
      background: rgba(0, 0, 0, 0);
    }

    ${ButtonLink} {
      background: rgba(60, 60, 60, 1);
      color: rgba(234, 234, 234, 1);
    }

    ${Text},${SubTitle} {
      display: none;
    }
  }

  ${Meta} {
    display: flex;
  }

  &:first-of-type {
    margin-left: 56px;

    @media (max-width: 1000px) {
      margin-left: 30px;
    }
  }

  &:last-of-type {
    margin-right: 56px;

    @media (max-width: 1000px) {
      margin-right: 30px;
    }
  }
`;

export const FeatureText = styled.p`
  font-size: 18px;
  color: white;
  font-weight: ${({ fontWeight }) =>
    fontWeight === "bold" ? "bold" : "normal"};
  margin: 0;

  @media (max-width: 600px) {
    line-height: 22px;
  }
`;

export const Feature = styled.div`
  display: flex;
  flex-direction: row;
  background: url(${({ src }) => src});
  background-size: contain;
  position: sticky;
  height: 757px;
  background-position-x: right;
  background-repeat: no-repeat;
  background-color: #eaeaea;
  z-index: 1;
  border-radius: 16px;
  -webkit-box-shadow: 10px 26px 42px -20px rgba(0, 0, 0, 0.56);
  -moz-box-shadow: 10px 26px 42px -20px rgba(0, 0, 0, 0.56);
  box-shadow: 10px 26px 42px -20px rgba(0, 0, 0, 0.56);
  margin-top: 20px;

  @media (max-width: 1000px) {
    height: auto;
    background-size: auto;

    ${Title} {
      font-size: 20px;
      line-height: 20px;
      margin-bottom: 10px;
    }
    ${FeatureText} {
      font-size: 14px;
    }
  }
`;

export const FeatureTitle = styled(Title)`
  margin-left: 0;
`;

export const FeatureClose = styled.button`
  color: white;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  background-color: transparent;
  border: 0;

  img {
    filter: brightness(0) invert(1);
    width: 24px;
  }
`;

export const Content = styled.div`
  margin: 56px;
  max-width: 500px;
  line-height: normal;

  @media (max-width: 1000px) {
    margin: 30px;
    max-width: none;
  }
`;

export const Maturity = styled.div`
  background-color: ${({ rating }) => (rating >= 15 ? "red" : "green")};
  border-radius: 15px;
  width: 20px;
  padding: 5px;
  text-align: center;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
  font-size: 12px;
`;

export const CityButton = styled.button``;
