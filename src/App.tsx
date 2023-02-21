import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { useGlobalState } from "./context/context";

//Need to implement lazy loading

const Loading = () => <p>Loading ...</p>;

function App() {
  const [state] = useGlobalState();
  return (
    <div>
      <React.Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={state.user}>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;

const ProtectedRoute = ({ user, children }:any) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
