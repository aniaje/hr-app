import React from "react";
import {
  FcBullish,
  FcBusinessContact,
  FcMultipleDevices,
} from "react-icons/fc";
import { useGetAllCandidatesQuery } from "redux/services/candidates";
import { useGetAllJobsQuery } from "redux/services/jobs";
import { StatData } from "types";

import {
  SectionTop,
  Section,
  Card,
  DashboardCount,
  Title,
  GeneralContainer,
  DWrapper,
  DStats,
  GrowthInfo,
  StatisticInfo,
  StatTitle,
  TextContainer,
} from "./Dashboard.styles";

const Dashboard = () => {
  const { data: jobs } = useGetAllJobsQuery([]);
  const { data: candidates } = useGetAllCandidatesQuery([]);

  const totalJobs = !jobs ? 0 : Object.values(jobs).length;
  const totalCandidates = !candidates ? 0 : Object.values(candidates).length;

  const data: StatData[] = [
    {
      title: "Employees",
      stat: "245k",
      icon: <FcBullish size={56} />,
    },
    {
      title: "Candidates",
      stat: "854",
      icon: <FcBusinessContact size={56} />,
    },
    {
      title: "Interviews",
      stat: "54k",
      icon: <FcMultipleDevices size={56} />,
    },
  ];

  return (
    <DWrapper>
      <SectionTop>
        <Card>
          <Title>Open Positions</Title>
          <DashboardCount>{totalJobs}</DashboardCount>
        </Card>
        <Card>
          <Title> Candidates</Title>

          <DashboardCount>{totalCandidates}</DashboardCount>
        </Card>
      </SectionTop>
      <Section>
        <GeneralContainer>
          <Title>General</Title>
          <GrowthInfo>
            Total 48% growth &#128170;<span> this month</span>
          </GrowthInfo>
          <DStats>
            {data.map(({ stat, title, icon }) => (
              <StatisticInfo>
                {icon}
                <TextContainer>
                  <StatTitle>{title}</StatTitle>

                  <Title>{stat}</Title>
                </TextContainer>
              </StatisticInfo>
            ))}
          </DStats>
        </GeneralContainer>
      </Section>
    </DWrapper>
  );
};

export default Dashboard;
