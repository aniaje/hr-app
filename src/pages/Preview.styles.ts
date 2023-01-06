import styled from "styled-components";

export const Preview = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 2rem;
  flex-direction: column;
`;

export const PreviewHeader = styled.header`
  margin-inline: auto;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
export const Img = styled.img`
  width: min(100% - 1rem, 10rem);
  text-align: center;
`;

export const Company = styled.h3`
  font-weight: lighter;
`;

export const Position = styled.h2`
  letter-spacing: 0.2rem;
  margin: 0;

  text-transform: uppercase;
`;
export const Title = styled.h1`
  color: inherit;
  padding: 2rem 0;
`;

export const Date = styled.p`
  font-size: 0.7rem;
  margin: 0;
  padding: 0;
`;

export const Desc = styled.p`
  letter-spacing: 0.3rem;
  line-height: 1.5rem;
`;

export const Return = styled.div`
  height: 100%;
  text-align: right;
  margin-top: 2rem;
  cursor: pointer;

  :hover {
    color: orangered;
  }
`;
