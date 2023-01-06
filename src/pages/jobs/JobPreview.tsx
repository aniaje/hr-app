import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOneJobQuery } from "redux/services/jobs";
import { BsArrowReturnRight } from "react-icons/bs";
import {
  Preview,
  PreviewHeader,
  Img,
  Company,
  Title,
  Desc,
  Date,
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
          <Img src={data.logo} />
          <Company>{data.companyName}</Company>
          <Date>{data.date}</Date>
          <Title>{data.title}</Title>
        </PreviewHeader>
        <Desc>{data.shortDescription}</Desc>
        <Return onClick={() => navigate("/jobs")}>
          {" "}
          <BsArrowReturnRight size={25} />
        </Return>
      </Preview>
    )
  );
};

export default JobPreview;
