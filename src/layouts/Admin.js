import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
// @material-ui/core components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons components
import MenuIcon from '@material-ui/icons/Menu';
// core components
import PersistentDrawer from '../components/PersistentDrawer';
import Search from '../components/Search';
import ProfileButton from '../components/ProfileButton';
import ProfilePopover from '../components/ProfilePopover';
// pages
import Settings from '../pages/Settings';
import Dashboard from "../pages/Dashboard";

const drawerWidth = 240;
const drawerHeight = 64;

// styled components
const Layout = styled.div`
  display: flex;
`;
const StyledAppBar = styled(AppBar)`
  margin-left: ${props => props.shifted ? `${drawerWidth}px` : '0'};
  width: ${props => props.shifted ? `calc(100% - ${drawerWidth}px)` : '100%'};
`;
const StyledIconButton = styled(IconButton)`
  display: ${props => props.show ? 'inline-block' : 'none'};
`;
const Content = styled.main`
  flex-grow: 1;
  margin-left: ${props => props.shifted ? '0' : `-${drawerWidth}px`};
  margin-top: ${drawerHeight}px;
  padding: 24px;
`;

const GridContainer = ({ children, ...rest }) => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    justify="space-between"
    {...rest}
  >
    {children}
  </Grid>
);
const GridItem = ({ children, ...rest }) => (
  <Grid item {...rest}>{children}</Grid>
);

// main component
const AdminLayout = ({ title = 'Dashboard' }) => {
  // state
  const [openDrawer, setOpenDrawer] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // functions to handle drawer opening/closing
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  // functions to handle profile popover opening/closing
  const open = Boolean(anchorEl);
  const handleProfilePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleProfilePopoverClose = () => {
    setAnchorEl(null);
  };

  // render component
  const renderLeftAppBarContent = () => (
    <GridItem>
      <GridContainer>
        <GridItem>
          <StyledIconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            show={openDrawer ? 0 : 1}
          >
            <MenuIcon />
          </StyledIconButton>
        </GridItem>
        <GridItem>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </GridItem>
      </GridContainer>
    </GridItem>
  );
  const renderRightAppBarContent = () => (
    <GridItem>
      <GridContainer>
        <GridItem>
          <Search />
        </GridItem>
        <GridItem>
          <ProfileButton
            text="Hi, Marion"
            alt="Marion Cotillard"
            src="/avatar.jpg"
            onClick={handleProfilePopoverOpen}
          />
          <ProfilePopover 
            anchorEl={anchorEl}
            open={open}
            onClose={handleProfilePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          />
        </GridItem>
      </GridContainer>
    </GridItem>
  );
  const renderAppBar = () => (
    <StyledAppBar 
      position="fixed" 
      shifted={openDrawer ? 1 : 0}
    >
      <Toolbar>
        <GridContainer>
          {renderLeftAppBarContent()}
          {renderRightAppBarContent()}
        </GridContainer>
      </Toolbar>
    </StyledAppBar>
  );
  const renderContent = () => (
    <Content shifted={openDrawer ? 1 : 0}>
      <Switch>
        <Route path={`/settings`} component={Settings} />
        <Route path={`/dashboard`} component={Dashboard} />
      </Switch>
    </Content>
  );

  return (
    <Layout>
      { /* HEADER BAR */ }
      {renderAppBar()}
      { /* DRAWER MENU */ }
      <PersistentDrawer
        open={openDrawer}
        onClose={handleDrawerClose}
      />
      { /* MAIN CONTENT */ }
      {renderContent()}
    </Layout>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

export default AdminLayout;
