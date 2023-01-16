import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import JobPreview from "pages/jobs/JobPreview";
import CandidatePreview from "pages/candidates/CandidatePreview";
import Jobs from "./pages/jobs/Jobs";
import Candidates from "./pages/candidates/Candidates";
import { Homepage } from "./pages/Homepage";
import { SignIn } from "./pages/signin/Signin";
import { SignUp } from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import AuthLayout from "./components/layouts/AuthLayout";
import Layout from "./components/layouts/Layout";
import ProtectedRoute from "./auth/ProtectedRoute";
import { lightTheme, darkTheme } from "./styles/theme";
import GlobalStyle from "./styles/globalStyle";

const App: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.ui);
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />

      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Homepage />} />

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route element={<Layout />}>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/preview/:id" element={<JobPreview />} />

            <Route path="/candidates" element={<Candidates />} />
            <Route
              path="/candidates/preview/:id"
              element={<CandidatePreview />}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
