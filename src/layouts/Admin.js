import React, { useState } from "react";
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

// main component
const AdminLayout = (props) => {
  // props
  const {
    children,
    title = 'Dashboard'
  } = props;
  // state
  const [openDrawer, setOpenDrawer] = useState(false);
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

  const renderDrawer = () => (
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
        <List
          dense={true}
          subheader={<ListSubheader>Pages</ListSubheader>}
        >
          <ListItem button>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
          <ListItem button>
            <ListItemIcon><BarChartIcon /></ListItemIcon>
            <ListItemText primary='Management' />
          </ListItem>
          <ListItem button onClick={handleClickSettings}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary='Settings' />
            {openSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSettings} timeout="auto" unmountOnExit>
            <List dense={true}>
              <NestedListItem button>
                <Dot />
                <ListItemText primary='General' />
              </NestedListItem>
              <NestedListItem button>
                <Dot />
                <ListItemText primary='Subscription' />
              </NestedListItem>
              <NestedListItem button>
                <Dot />
                <ListItemText primary='Notifications' />
              </NestedListItem>
              <NestedListItem button>
                <Dot />
                <ListItemText primary='Security' />
              </NestedListItem>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemIcon><LockOpenIcon /></ListItemIcon>
            <ListItemText primary='Authentication' />
          </ListItem>
        </List>
        <List
          dense={true}
          subheader={
            <ListSubheader>Support</ListSubheader>
          }
        >
          <ListItem button>
            <ListItemIcon><AppsIcon /></ListItemIcon>
            <ListItemText primary='Components' />
          </ListItem>
          <ListItem button>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText primary='Getting started' />
          </ListItem>
          <ListItem button>
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary='Changelog' />
          </ListItem>
        </List>
      </DrawerContent>
    </StyledDrawer>
  );

  const renderContent = () => (
    <Content shifted={openDrawer ? 1 : 0}>
      {children}
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
