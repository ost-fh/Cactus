import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Contribute from "./pages/Contribute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PublicLayout from "./pages/PublicLayout";
import Libraries from "./pages/Libraries";
import LabLayout from "./testlabPages/LabLayout";
import LibraryDetail from "./pages/LibraryDetail";
import AddLibrary from "./pages/AddLibrary";
import "./fonts/AtkinsonHyperlegible-Regular.ttf";

function App() {
  const [token, setToken] = useState();
  return (
    <>
      <Routes>
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<Navigate to='home' />} />
          <Route path='home' element={<Home />} />
          <Route path='libraries' element={<Libraries token={token} />} />
          <Route path='libraries/new' element={<AddLibrary />} />
          <Route
            path='libraries/:id'
            element={<LibraryDetail token={token} />}
          />
          <Route path='contribute' element={<Contribute />} />
          <Route path='login' element={<Login setToken={setToken} />} />
        </Route>
        {token ? (
          <Route path='testlab/:id/:version/*' element={<LabLayout />}></Route>
        ) : (
          <Route path='testlab' element={<Navigate to='/' />} />
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
