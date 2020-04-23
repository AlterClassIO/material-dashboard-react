import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styled from 'styled-components';
// core components
import TopBar from "../components/TopBar";
import PersistentDrawer from '../components/PersistentDrawer';
// pages
import Settings from '../pages/Settings';
import Customers from '../pages/Customers';
import Projects from '../pages/Projects';
import Orders from '../pages/Orders';
import Dashboard from "../pages/Dashboard";

const drawerWidth = 240;
const drawerHeight = 64;

// styled components
const Layout = styled.div`
  display: flex;
`;
const Content = styled.main`
  flex-grow: 1;
  margin-left: ${props => props.shifted ? '0' : `-${drawerWidth}px`};
  margin-top: ${drawerHeight}px;
  padding: 24px 64px;
`;

// main component
const AdminLayout = (props) => {
  // state
  const [openDrawer, setOpenDrawer] = useState(true);
  // render component
  return (
    <Layout>
      { /* HEADER BAR */ }
      <TopBar
        showMenuIcon={!openDrawer}
        onClickMenu={() => setOpenDrawer(true)}
        shift={openDrawer ? drawerWidth : 0}
      />
      { /* DRAWER MENU */ }
      <PersistentDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
      { /* MAIN CONTENT */ }
      <Content shifted={openDrawer ? 1 : 0}>
        <Switch>
          <Route path={`/management/customers`} component={Customers} />
          <Route path={`/management/projects`} component={Projects} />
          <Route path={`/management/orders`} component={Orders} />
          <Route path={`/settings`} component={Settings} />
          <Route path={`/dashboard`} component={Dashboard} />
        </Switch>
      </Content>
    </Layout>
  );
};

export default AdminLayout;
