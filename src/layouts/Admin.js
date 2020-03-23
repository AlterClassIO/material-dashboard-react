import React, { useState } from "react";
import styled from 'styled-components';
// @material-ui/core components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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
`;

// main component
const AdminLayout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Layout>
      { /* HEADER BAR */ }
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
            AlterClass
          </Typography>
          <ToolbarContent>
            <Search />
          </ToolbarContent>
        </Toolbar>
      </StyledAppBar>

      { /* DRAWER MENU */ }
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
          <Divider />
        </DrawerContent>
      </StyledDrawer>

      { /* MAIN CONTENT */ }
      <Content shifted={openDrawer ? 1 : 0}>
        {children}
      </Content>
    </Layout>
  );
};

export default AdminLayout;
