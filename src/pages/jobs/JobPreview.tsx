import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOneJobQuery } from "redux/services/jobs";
import { BsArrowReturnRight } from "react-icons/bs";
import {
  Preview,
  PreviewHeader,
  PreImg,
  PreCompany,
  PreTitle,
  PreDesc,
  PreDate,
  Return,
} from "../Preview.styles";

const JobPreview = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetOneJobQuery(id);

  return (
    data && (
      <Preview>
        <PreviewHeader>
          <PreImg src={data.logo} />
          <PreCompany>{data.companyName}</PreCompany>
          <PreDate>{data.date}</PreDate>
          <PreTitle>{data.title}</PreTitle>
        </PreviewHeader>
        <PreDesc>{data.shortDescription}</PreDesc>
        <Return onClick={() => navigate("/jobs")}>
          {" "}
          <BsArrowReturnRight size={25} />
        </Return>
      </Preview>
    )
  );
};

export default JobPreview;
