import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./layout/reset.css";
import Contribute from "./pages/Contribute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Libraries from "./pages/Libraries";
import LabLayout from "./layout/LabLayout";
import LibraryDetail from "./pages/LibraryDetail";
import AddLibrary from "./pages/AddLibrary";
import "./fonts/AtkinsonHyperlegible-Regular.ttf";
import About from "./pages/About";
import TestLab from "./testlabPages/TestLab";

function App() {
  const [token, setToken] = useState();
  return (
    <>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='libraries' element={<Libraries token={token} />} />
          <Route path='libraries/new' element={<AddLibrary />} />
          <Route
            path='libraries/:id'
            element={<LibraryDetail token={token} />}
          />
          <Route path='contribute' element={<Contribute />} />
          <Route path='about' element={<About />} />
          <Route path='login' element={<Login setToken={setToken} />} />
        </Route>
        {token ? (
          <Route path='testlab/:id/:version/*' element={<TestLab />}></Route>
        ) : (
          <Route path='testlab' element={<Navigate to='/' />} />
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
