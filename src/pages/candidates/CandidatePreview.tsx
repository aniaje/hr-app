import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowReturnRight } from "react-icons/bs";
import { useGetOneCandidateQuery } from "redux/services/candidates";
import {
  Preview,
  PreImg,
  PreviewHeader,
  PreCompany,
  PreTitle,
  PrePosition,
  PreDesc,
  PreDate,
  Return,
} from "../Preview.styles";

const CandidatePreview = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetOneCandidateQuery(id);
  console.log(data);

  return (
    data && (
      <Preview>
        <PreviewHeader>
          <PreImg src={data.logo} />
          <PreCompany>{data.companyName}</PreCompany>
          <PreDate>{data.date}</PreDate>
          <PreTitle>{data.name}</PreTitle>
        </PreviewHeader>
        <PrePosition>{data.position}</PrePosition>
        <PreDesc>{data.shortDescription}</PreDesc>
        <Return onClick={() => navigate("/candidates")}>
          {" "}
          <BsArrowReturnRight size={25} />
        </Return>
      </Preview>
    )
  );
};

export default CandidatePreview;
