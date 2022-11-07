import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import Contribute from "./pages/Contribute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PublicLayout from "./pages/PublicLayout";
import Libraries from "./pages/Libraries";
import LabLayout from "./testlabPages/LabLayout";
import LabLibraryDetail from "./pages/LibraryDetail";
import Test from "./testlabPages/Test";
import Start from "./testlabPages/Start";
import AddLibrary from "./pages/AddLibrary";

function App() {
  const [token, setToken] = useState();
  return (
    <>
      <Routes>
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<Navigate to='home' />} />
          <Route path='home' element={<Home />} />
          <Route path='libraries' element={<Libraries />} />
          <Route path='libraries/new' element={<AddLibrary />} />
          <Route path='libraries/1' element={<LabLibraryDetail />} />
          <Route path='contribute' element={<Contribute />} />
          <Route path='login' element={<Login setToken={setToken} />} />
        </Route>
        {token ? (
          <Route path='testlab' element={<LabLayout />}>
            <Route index element={<Start />} />
            <Route path='test' element={<Test />} />
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
