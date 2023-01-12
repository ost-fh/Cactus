import React, { createContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./shared/layout/reset.css";
import "./shared/layout/general.css";
import "./shared/fonts/AtkinsonHyperlegible-Regular.ttf";
import "./shared/fonts/AtkinsonHyperlegible-Bold.ttf";

import AddLibrary from "./pages/add-library/add-library";
import TestLab from "./pages/testlab/test-lab";
import LogOut from "./pages/logout/logout";
import Home from "./pages/home/home";
import Libraries from "./pages/libraries/libraries";
import LibraryDetail from "./pages/library-detail/library-detail";
import Login from "./pages/login/login";
import Contribute from "./pages/contribute/contribute";
import NotFound from "./pages/not-found/not-found";
import { useUserData } from "./shared/services/use-token";
import ProtectedRoute from "./shared/components/protected-route";

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
          <Route
            path='libraries/new'
            element={
              <ProtectedRoute user={userData}>
                <AddLibrary />
              </ProtectedRoute>
            }
          />
          <Route path='libraries/:paramsId/' element={<LibraryDetail />} />
          <Route
            path='libraries/:paramsId/:paramsVersion/'
            element={<LibraryDetail />}
          />
          <Route
            path='contribute'
            element={<Contribute setUserData={setUserData} />}
          />
          <Route path='login' element={<Login setUserData={setUserData} />} />
          <Route path='logout' element={<LogOut logOut={logOut} />} />
        </Route>
        <Route
          path='testlab/:id/:version/*'
          element={
            <ProtectedRoute user={userData}>
              <TestLab />
            </ProtectedRoute>
          }
        ></Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
