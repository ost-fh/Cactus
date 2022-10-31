import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import Contribute from "./pages/Contribute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PublicLayout from "./pages/PublicLayout";
import Results from "./pages/Results";
import ResultsDetail from "./pages/ResultsDetail";
import LabLayout from "./testlabPages/LabLayout";
import LabLibraryDetail from "./testlabPages/LabLibraryDetail";
import LabOverview from "./testlabPages/LabOverview";

function App() {
  const [token, setToken] = useState();
  return (
    <>
      <Routes>
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<Navigate to='home' />} />
          <Route path='home' element={<Home />} />
          <Route path='results' element={<Results />} />
          <Route path='results/1' element={<ResultsDetail />} />
          <Route path='contribute' element={<Contribute />} />
          <Route path='login' element={<Login setToken={setToken} />} />
        </Route>
        {token ? (
          <Route path='testlab' element={<LabLayout />}>
            <Route index element={<LabOverview />} />
            <Route path='1' element={<LabLibraryDetail />} />
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
