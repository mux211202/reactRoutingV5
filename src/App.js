import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import AllQuotes from "./pages/AllQuotes";

const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner/>}>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/quotes'/>
          </Route>
          <Route path='/quotes' exact>
            <AllQuotes/>
          </Route>
          <Route path='/quotes/:quotesId'>
            <QuoteDetail/>
          </Route>
          <Route path='/new-quote'>
            <NewQuote/>
          </Route>
          <Route path='*'><NotFound/></Route>
        </Switch>
      </Suspense>
      
    </Layout>
    
  );
}

export default App;
