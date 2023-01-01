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
  DStatInfo,
} from "./Dashboard.styles";

const Dashboard = () => {
  const { data: GetAllJobs } = useGetAllJobsQuery([]);
  const { data: GetAllCandidates } = useGetAllCandidatesQuery([]);
  if (!GetAllJobs) return null;
  if (!GetAllCandidates) return null;
  const totalJobs = Object.values(GetAllJobs).length;
  const totalCandidates = Object.values(GetAllCandidates).length;

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
            <DStatInfo>
              <FcBullish size={56} />

              <DStatTable />
            </DStatInfo>
            <DStatInfo>
              <FcBusinessContact size={56} />

              <DStatTable />
            </DStatInfo>
            <DStatInfo>
              <FcMultipleDevices size={56} />

              <DStatTable />
            </DStatInfo>
          </DStats>
        </GeneralContainer>
      </Section>
    </DWrapper>
  );
};

export default Dashboard;
