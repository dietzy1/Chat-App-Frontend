/** @format */

import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import React from "react";

import { useGlobalState } from "./context/context";

const Loading = () => <p>Loading ...</p>;

function App() {
  //const [state] = useGlobalState();
  return (
    <div>
      <React.Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage />
                /*    <ProtectedRoute user={state.user}>
                  <Home />
                </ProtectedRoute> */
              }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;

const ProtectedRoute = ({ user, children }: any) => {
  console.log(user);

  if (!user) {
    //return <navigate to="/login" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
};
