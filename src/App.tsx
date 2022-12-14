import React, { createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./reset.css";
import "./App.css";
import "./fonts/AtkinsonHyperlegible-Regular.ttf";

import Contribute from "./pages/Contribute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Libraries from "./pages/Libraries";
import LibraryDetail from "./pages/LibraryDetail";
import AddLibrary from "./pages/AddLibrary";
import About from "./pages/About";
import TestLab from "./testlabPages/TestLab";
import { useUserData } from "./services/useToken";
import LogOut from "./pages/LogOut";

export type UserData = {
  _id: string;
  username: string;
  email: string;
  token: string;
};

export const UserContext = createContext<UserData | undefined>(undefined);

function App() {
  const { userData, setUserData } = useUserData();
  const token = {};

  const logOut = () => {
    setUserData(undefined);
  };

  return (
    <UserContext.Provider value={userData}>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='libraries' element={<Libraries />} />
          <Route path='libraries/new' element={<AddLibrary />} />
          <Route path='libraries/:id' element={<LibraryDetail />} />
          <Route
            path='contribute'
            element={<Contribute setUserData={setUserData} />}
          />
          <Route path='about' element={<About />} />
          <Route path='login' element={<Login setUserData={setUserData} />} />
          <Route path='logout' element={<LogOut logOut={logOut} />} />
        </Route>
        {token ? (
          <Route path='testlab/:id/:version/*' element={<TestLab />}></Route>
        ) : (
          <Route path='testlab' element={<Navigate to='/' />} />
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
