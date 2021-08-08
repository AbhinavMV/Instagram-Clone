import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import useAuthListner from "./hooks/useAuthListener";
import UserContext from "./context/user";
import ProtectedRoutes from "./helpers/protectedRoutes";
import IsUserLoggedIn from "./helpers/isUserLoggedIn";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Chats = lazy(() => import("./pages/Chats"));

function App() {
  const { user } = useAuthListner();

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={<p>Loading....</p>}>
          <Switch>
            <IsUserLoggedIn user={user} isLoggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} isLoggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP}>
              <SignUp />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoutes user={user} exact path={ROUTES.DASHBOARD}>
              <Dashboard />
            </ProtectedRoutes>
            <ProtectedRoutes user={user} exact path={ROUTES.MESSAGES}>
              <Chats />
            </ProtectedRoutes>
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
