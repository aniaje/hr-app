import styled from "styled-components";
import { FcBullish } from "react-icons/fc";

import { variables } from "../../styles/variables";

export const DWrapper = styled.main`
  width: 80%;
`;
export const Section = styled.div`
  display: flex;
  height: max-content;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    height: max-content;
    width: 100%;
  }
`;

export const SectionTop = styled.div`
  height: 200px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    height: max-content;
    width: 100%;
  }
`;

export const GeneralContainer = styled.div`
  height: max-content;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 2rem 2rem;
  border-radius: 1rem;
  background-color: #fefefe;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    height: max-content;
    display: flex;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 80%;
  }
`;

export const Card = styled.div`
  height: max-content;
  width: 100%;
  background: rgba(255, 170, 55, 0.05312062324929976);

  text-align: center;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  transition: 0.4s ease-in-out;

  @media screen and (min-width: 190px) and (max-width: 1080px) {
    width: 80%; //height: max-content;
  }
`;

export const Title = styled.h3`
  font-size: ${variables.mTitle};
  font-weight: 500;
`;

export const DashboardCount = styled.h3`
  font-size: ${variables.lTitle};
  font-weight: 300;
`;

export const GrowthInfo = styled.p`
  padding: 1rem 0;
  font-size: ${variables.sTitle};
  font-weight: lighter;

  & span {
    color: ${({ theme }) => theme.textFade};
    font-weight: lighter;
  }
`;

export const DStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.4rem;
  padding-top: 0.6rem 0 0 0.6rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const StatisticInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  width: 50%;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
`;

const DTextContainer = styled.div`
  padding-left: 0.2rem;
`;

const DStatTitle = styled.p`
  font-size: ${variables.sTitle};
`;

const DStatTable = () => (
  <DTextContainer>
    <DStatTitle>Candidates</DStatTitle>
    <Title>245k</Title>
  </DTextContainer>
);

export default DStatTable;
