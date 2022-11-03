import React, { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";
import BaseLayout from "./components/BaseLayout";

// ** Import Route Providers
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Vesting = lazy(() => import("./pages/Vesting"));
const LockUp = lazy(() => import("./pages/LockUp"));
const Claim = lazy(() => import("./pages/Claim"));
const Airdrop = lazy(() => import("./pages/Airdrop"));

const history = createBrowserHistory({
    basename: "",
    forceRefresh: false,
});

const AppRouter = () => {
    return (
        <Router history={history}>
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/dashboard" />
                    </Route>
                    <BaseLayout>
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/vesting" exact component={Vesting} />
                        <Route path="/Claim" exact component={Claim} />
                        <Route path="/lockup/:wallet/:token" exact component={LockUp} />
                        <Route path="/airdrop" exact component={Airdrop} />
                    </BaseLayout>
                </Switch>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
