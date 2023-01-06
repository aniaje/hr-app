import React from "react";
import {
  FcBullish,
  FcBusinessContact,
  FcMultipleDevices,
} from "react-icons/fc";
import { useGetAllCandidatesQuery } from "redux/services/candidates";
import { useGetAllJobsQuery } from "redux/services/jobs";

import DStatTable, {
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
} from "./Dashboard.styles";

const Dashboard = () => {
  const { data: jobs } = useGetAllJobsQuery([]);
  const { data: candidates } = useGetAllCandidatesQuery([]);

  const totalJobs = !jobs ? 0 : Object.values(jobs).length;
  const totalCandidates = !candidates ? 0 : Object.values(candidates).length;

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
            <StatisticInfo>
              <FcBullish size={56} />

              <DStatTable />
            </StatisticInfo>
            <StatisticInfo>
              <FcBusinessContact size={56} />

              <DStatTable />
            </StatisticInfo>
            <StatisticInfo>
              <FcMultipleDevices size={56} />

              <DStatTable />
            </StatisticInfo>
          </DStats>
        </GeneralContainer>
      </Section>
    </DWrapper>
  );
};

export default Dashboard;
