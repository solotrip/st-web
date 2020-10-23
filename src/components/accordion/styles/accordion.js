import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  margin: -10px;
`;

export const Inner = styled.div`
  padding: 0px 0px;
  flex-direction: column;
  max-width: 815px;
  margin: 0px;
`;

export const Item = styled.div`
  color: #3c3c3c;
  margin-bottom: 10px;

  width: 100%;

  &:first-of-type {
    margin-top: 3em;
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
  width: 230px;

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

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const Frame = styled.div`
  margin-bottom: 10px;
`;

export const Title = styled.p`
  font-size: 18px;
  color: #3c3c3c;
  font-weight: regular;
  margin-top: 40px;
  margin-left: 20px;
  line-height: 1.1;
  margin-top: 10px;
  color: #3c3c3c;
  text-align: left;
`;
