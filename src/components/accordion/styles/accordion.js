import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  margin: 0px;
  margin-top: 10px;
  margin-bottom: 10px;

  border-radius: 16px;

  margin-left: -50px;
  
`;

export const Inner = styled.div`
  flex-direction: column;
  
  
`;

export const Item = styled.div`
  color: #3c3c3c;
  margin-bottom: 10px;
  background-color: transparent;

  border-radius: 4px;
  border-radius: 16px;

  margin-left: 20px;

  &:first-of-type {
    margin-top: 6em;
  }
`;

export const Header = styled.div`
  display: flex;
  cursor: pointer;
  margin-bottom: 1px;
  font-size: 16px;
  font-weight: normal;
  background: transparent;
  padding: 1.2em;
  user-select: none;
  width: 30vh;
  
  /*increase the margin-left*/
  margin-left: 60px;

  img {
    margin-left: auto;
    width: 16px;

    @media (max-width: 600px) {
      width: 16px;
    }
  }

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const Body = styled.div`
  max-height: 1200px;
  transition: max-height 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  font-size: 13px;
  font-weight: normal;
  line-height: normal;
  background: transparent;
  padding: 0.8em 2.2em 0.8em 1.2em;
  white-space: pre-wrap;
  user-select: none;
  border: 1px solid rgb(234, 234, 234);
  background-color: rgba(135,206,235,0.7);
  border-radius: 16px;

  margin-left: 60px;


  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const Frame = styled.div`
  margin-bottom: 10px;
  background-color: brown;
 
`;

export const Title = styled.p`
  font-size: 18px;
  color: #3c3c3c;
  font-weight: regular;
  margin-top: 140px;
  margin-left: 0px;
  line-height: 1.1;
  
  color: #3c3c3c;
  text-align: left;
  border: 1px solid rgb(234, 234, 234);
`;
