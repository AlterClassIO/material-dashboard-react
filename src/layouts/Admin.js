import React, { useState } from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
// @material-ui/core components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import CodeIcon from '@material-ui/icons/Code';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// core components
import Search from '../components/Search';
// pages
import Settings from '../pages/Settings';

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
const ToolbarContent = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`;
const StyledIconButton = styled(IconButton)`
  display: ${props => props.show ? 'inline-block' : 'none'};
`;
const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
`;
const DrawerContent = styled.div`
  width: ${drawerWidth}px;
`;
const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  height: ${drawerHeight}px;
`;
const Content = styled.main`
  flex-grow: 1;
  margin-left: ${props => props.shifted ? '0' : `-${drawerWidth}px`};
  margin-top: ${drawerHeight}px;
  padding: 24px;
`;
const NestedListItem = styled(ListItem)`
  padding-left: 56px;
`;
const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.87);
  display: inline-block;
  margin-right: 15px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

// main component
const AdminLayout = ({ title = 'Dashboard' }) => {
  // state
  const [openDrawer, setOpenDrawer] = useState(true);
  const [openSettings, setOpenSettings] = useState(false);
  // functions to handle drawer opening/closing
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  // functions to handle nested lists opening/closing
  const handleClickSettings = () => {
    setOpenSettings(!openSettings);
  };

  // render component
  const renderAppBar = () => (
    <StyledAppBar 
      position="fixed" 
      shifted={openDrawer ? 1 : 0}
    >
      <Toolbar>
        <StyledIconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          show={openDrawer ? 0 : 1}
        >
          <MenuIcon />
        </StyledIconButton>
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
        <ToolbarContent>
          <Search />
        </ToolbarContent>
      </Toolbar>
    </StyledAppBar>
  );
  const renderList = (title, list) => {
    return (
      <List
        dense={true}
        subheader={
          <ListSubheader disableSticky={true}>
            {title}
          </ListSubheader>
        }
      >
        {
          list.map(item => (
            <React.Fragment key={item.text}>
              <ListItem
                button
                onClick={item.handleClick ? () => item.handleClick() : null}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}/>
                {item.list ? (item.listOpened ? <ExpandLess /> : <ExpandMore />) : null}
              </ListItem>
              {
                item.list && item.list.length > 0 && (
                  <Collapse
                    in={item.listOpened}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List dense={true}>
                      {
                        item.list.map(nestedItem => (
                          <StyledLink
                            key={nestedItem.text}
                            to={location => (
                              { ...location, pathname: `/${item.link}/${nestedItem.link}` }
                            )}
                          >
                            <NestedListItem button>
                              <Dot />
                              <ListItemText primary={nestedItem.text} />
                            </NestedListItem>
                          </StyledLink>
                        ))
                      }
                    </List>
                  </Collapse>
                )
              }
            </React.Fragment>
          ))
        }
      </List>
    )
  };
  const renderDrawer = () => {
    const firstListItems = [
      { icon: <HomeIcon />, text: "Dashboard" },
      { icon: <BarChartIcon />, text: "Management" },
      { 
        icon: <SettingsIcon />,
        text: "Settings",
        link: 'settings',
        list: [
          { text: 'General', link: 'general' },
          { text: 'Subscription', link: 'subscription' },
          { text: 'Notifications', link: 'notifications' },
          { text: 'Security', link: 'security'}
        ],
        listOpened: openSettings,
        handleClick: handleClickSettings
      },
      { icon: <LockOpenIcon />, text: "Authentication" }
    ];
    const secondListItems = [
      { icon: <AppsIcon />, text: "Components" },
      { icon: <CodeIcon />, text: "Getting started" },
      { icon: <ListIcon />, text: "Changelog" },
    ];
    return (
      <StyledDrawer
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
      <DrawerContent>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        {renderList('Pages', firstListItems)}
        {renderList('Support', secondListItems)}
      </DrawerContent>
    </StyledDrawer>
    );
  };
  const renderContent = () => (
    <Content shifted={openDrawer ? 1 : 0}>
      <Switch>
        <Route path={`/settings`} component={Settings} />
      </Switch>
    </Content>
  );

  return (
    <Layout>
      { /* HEADER BAR */ }
      {renderAppBar()}
      { /* DRAWER MENU */ }
      {renderDrawer()}
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
