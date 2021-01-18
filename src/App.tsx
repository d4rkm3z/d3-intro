import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { LinearGraph } from 'components/LinearGraph';
import { ScatterPlot } from 'components/ScatterPlot';


const NavBar = styled.ul`
  display: inline-flex;
  padding: 10px;
  flex-direction: column;
  background-color: lightslategrey;
`;

const RouteWrapper = styled.div`
  text-align: center;
`;

export default function App() {
  const routes = [
    {
      title: 'Linear graph',
      path: '/linear_graph',
      exact: true,
      component: LinearGraph
    },
    {
      title: 'Scatter plot',
      path: '/scatter_plot',
      exact: true,
      component: ScatterPlot
    }
  ];

  return (
    <Router>
      <NavBar>
        {routes.map((route, index) => (
          <li>
            <Link key={`navbar_${index}`}
                  to={route.path}>{route.title}</Link>
          </li>
        ))}
      </NavBar>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={`routes_${index}`}
            path={route.path}
            exact={route.exact || false}
          >
            <RouteWrapper>
              <route.component />
            </RouteWrapper>
          </Route>
        ))}
      </Switch>
    </Router>
  );
}