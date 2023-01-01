import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/AvatarMenu/Button";

const Title = styled.h2`
  font-size: 2em;
  text-align: center;
  color: black;
`;

export const Homepage: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Title>HR analytics</Title>
      <Button buttonText="Sign In" onClick={() => navigate("/signin")} />
      <Button buttonText="Sign Up" onClick={() => navigate("/signup")} />
    </>
  );
};
