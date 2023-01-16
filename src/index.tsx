import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom/client";
import { store } from "redux/store";
import { Provider } from "react-redux";
import App from "./App";

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.bg};
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Wrapper>
        <App />
      </Wrapper>
    </Provider>
  </React.StrictMode>
);
