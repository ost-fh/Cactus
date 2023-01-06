import React, { createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./shared/layout/reset.css";
import "./App.css";
import "./shared/fonts/AtkinsonHyperlegible-Regular.ttf";
import "./shared/fonts/AtkinsonHyperlegible-Bold.ttf";

import NotFound from "./pages/not-found/not-found";
import AddLibrary from "./pages/add-library/add-library";
import About from "./pages/about/about";
import TestLab from "./pages/testlab/test-lab";
import { useUserData } from "./shared/services/use-token";
import LogOut from "./pages/logout/logout";
import Home from "./pages/home/home";
import Libraries from "./pages/libraries/libraries";
import LibraryDetail from "./pages/library-detail/library-detail";
import Login from "./pages/login/login";
import Contribute from "./pages/contribute/contribute";

export type UserData = {
  _id: string;
  username: string;
  email: string;
  token: string;
};

export const UserContext = createContext<UserData | undefined>(undefined);

function App() {
  const { userData, setUserData } = useUserData();

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
          <Route path='libraries/:paramsId/' element={<LibraryDetail />} />
          <Route
            path='libraries/:paramsId/:paramsVersion/'
            element={<LibraryDetail />}
          />
          <Route
            path='contribute'
            element={<Contribute setUserData={setUserData} />}
          />
          <Route path='about' element={<About />} />
          <Route path='login' element={<Login setUserData={setUserData} />} />
          <Route path='logout' element={<LogOut logOut={logOut} />} />
        </Route>
        {userData?.token ? (
          <Route path='testlab/:id/:version/*' element={<TestLab />}></Route>
        ) : (
          <Route path='testlab/*' element={<Navigate to='/' />} />
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
