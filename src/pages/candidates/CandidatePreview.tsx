import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowReturnRight } from "react-icons/bs";
import { useGetOneCandidateQuery } from "redux/services/candidates";
import {
  Preview,
  Img,
  PreviewHeader,
  Company,
  Title,
  Position,
  Desc,
  Date,
  Return,
} from "../Preview.styles";

const CandidatePreview = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetOneCandidateQuery(id);

  return (
    data && (
      <Preview>
        <PreviewHeader>
          <Img src={data.logo} />
          <Company>{data.companyName}</Company>
          <Date>{data.date}</Date>
          <Title>{data.name}</Title>
        </PreviewHeader>
        <Position>{data.position}</Position>
        <Desc>{data.shortDescription}</Desc>
        <Return onClick={() => navigate("/candidates")}>
          {" "}
          <BsArrowReturnRight size={25} />
        </Return>
      </Preview>
    )
  );
};

export default CandidatePreview;
