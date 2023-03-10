import styled from "styled-components";
import { FcBullish } from "react-icons/fc";

import { variables } from "../../styles/variables";
import { Link } from "react-router-dom";

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
  background: ${({ theme }) => theme.bg2};
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
  background: ${({ theme }) => theme.bg2};
  text-align: center;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  transition: all 0.1s linear;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (min-width: 190px) and (max-width: 1080px) {
    width: 80%; //height: max-content;
  }
`;

export const Title = styled.h3`
  font-size: ${variables.mTitle};
  font-weight: 500;
`;

export const DataLink = styled(Link)`
  font-size: ${variables.lTitle};
  font-weight: 300;
  text-decoration: none;
  color: inherit;
  &:hover {
    transform: scale(1.1);
  }
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

export const TextContainer = styled.div`
  padding-left: 0.2rem;
`;

export const StatTitle = styled.p`
  font-size: ${variables.sTitle};
`;
