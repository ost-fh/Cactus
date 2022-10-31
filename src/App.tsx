import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import Contribute from "./pages/Contribute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PublicLayout from "./pages/PublicLayout";
import Results from "./pages/Results";
import TestLabLayout from "./pages/TestLabLayout";
import TestLabOverview from "./pages/TestLabOverview";

function App() {
  const [token, setToken] = useState();
  return (
    <>
      <Routes>
        <Route path='/' element={<PublicLayout />}>
          <Route path='home' index element={<Home />} />
          <Route path='results' element={<Results />} />
          <Route path='contribute' element={<Contribute />} />
          <Route path='login' element={<Login setToken={setToken} />} />
        </Route>
        {token ? (
          <Route path='testlab' element={<TestLabLayout />}>
            <Route path='overview' index element={<TestLabOverview />} />
          </Route>
        ) : (
          <Route path='testlab' element={<Navigate to='/' />} />
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
