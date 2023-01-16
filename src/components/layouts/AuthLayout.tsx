import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Container } from "./Container";

const AuthLayoutWrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  max-width: 100%;
  padding: 40px 20px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.3);
`;

const AuthLayout = () => (
  <Container>
    <AuthLayoutWrapper>
      <Outlet />
    </AuthLayoutWrapper>
  </Container>
);

export default AuthLayout;
