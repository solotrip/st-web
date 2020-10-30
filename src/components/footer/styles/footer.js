import styled from "styled-components/macro";

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  
 
  

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
  padding: 230px 0px 0px 0px;
  flex-direction: column;
  background-color: #f3f3f3;
 
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }

  

  @media (max-width: 1100px) {
    ${({ dontShowOnSmallViewPort }) =>
      dontShowOnSmallViewPort && `background: cover;`}
  }
`;

export const Column = styled.div`
  flex-direction: column;
  display: flex;
  text-align: middle;
  
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  grid-gap: 15px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

export const Link = styled.a`
  color: #757575;
  margin-bottom: 20px;
  font-size: 14px;
  text-decoration: none;
`;

export const Title = styled.p`
  font-size: 16px;
  color: #757575;
  margin-bottom: 60px;
  margin-top: 0px;
  
`;

export const Text = styled.p`
  font-size: 13px;
  color: #757575;
  margin-bottom: 40px;
`;

export const Break = styled.p`
  flex-basis: 100%;
  height: 300px;
`;
