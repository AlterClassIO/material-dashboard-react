import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
// @material-ui/core components
import { grey } from '@material-ui/core/colors';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// @material-ui/icons components
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import CodeIcon from '@material-ui/icons/Code';

// styled components
const StyledDrawer = styled(Drawer)`
  width: ${props => props.width}px;
  flex-shrink: 0;
`;
const DrawerContent = styled.div`
  width: ${props => props.width}px;
`;
const DrawerHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;
const DrawerFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
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
const StyledDivider = styled(Divider)`
  margin: 12px 0;
`;
const StyledAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
  margin: auto;
  margin-bottom: 12px;
`;
const Name = styled(Typography)`
  font-weight: 500;
`;
const Position = styled(Typography)`
  color: ${grey[700]};
`;
const Logo = styled.img`
  display: block;
  margin: auto;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const ReactLogo = styled.img`
  width: 24px;
  animation: ${rotate} 2s linear infinite;
`;

// main component
const PersistentDrawer = (props) => {
  // props
  const { 
    width = 240,
    height = 64,
    open = true,
    onClose = () => null
  } = props;
  // state
  const [openSettings, setOpenSettings] = useState(false);
  const [openManagement, setOpenManagement] = useState(false);
  // functions to handle nested lists opening/closing
  const handleClickSettings = () => {
    setOpenSettings(!openSettings);
  };
  const handleClickManagement = () => {
    setOpenManagement(!openManagement);
  };
  // functions to render lists and items
  const renderNestedItem = (item, nestedItem) => (
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
  );
  const renderNestedList = (item) => (
    <Collapse
      in={item.open}
      timeout="auto"
      unmountOnExit
    >
      <List dense={true}>
        {item.items.map(nestedItem => renderNestedItem(item, nestedItem))}
      </List>
    </Collapse>
  );
  const renderItem = (item) => {
    const Item = (
      <ListItem
        button
        onClick={item.handleClick ? () => item.handleClick() : null}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text}/>
        {item.items ? (item.open ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItem>
    );
    if (item.items && item.items.length > 0) {
      return Item;
    }
    return (
      <StyledLink
        key={item.text}
        to={location => (
          { ...location, pathname: `/${item.link}` }
        )}
      >
        {Item}
      </StyledLink>
    );
  }
  const renderList = (title, list) => (
    <List
      key={title}
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
            {renderItem(item)}
            {item.items && item.items.length > 0 && renderNestedList(item)}
          </React.Fragment>
        ))
      }
    </List>
  );
  // lists to render
  const lists = [
    {
      title: "Pages",
      items: [
        { icon: <HomeIcon />, text: "Dashboard", link: 'dashboard' },
        { 
          icon: <BarChartIcon />,
          text: "Management",
          link: 'management',
          items: [
            { text: 'Customers', link: 'customers' },
            { text: 'Projects', link: 'projects' },
            { text: 'Orders', link: 'orders' }
          ],
          open: openManagement,
          handleClick: handleClickManagement
        },
        { 
          icon: <SettingsIcon />,
          text: "Settings",
          link: 'settings',
          items: [
            { text: 'General', link: 'general' },
            { text: 'Subscription', link: 'subscription' },
            { text: 'Notifications', link: 'notifications' },
            { text: 'Security', link: 'security'}
          ],
          open: openSettings,
          handleClick: handleClickSettings
        }
      ]
    },
    {
      title: "Support",
      items: [
        { icon: <AppsIcon />, text: "Components", link: 'components' },
        { icon: <CodeIcon />, text: "Getting started", link: 'getting-started' },
        { icon: <ListIcon />, text: "Changelog", link: 'changelog' }
      ]
    }
  ];
  // render component
  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={open}
      width={width}
    >
      <DrawerContent width={width}>
        <DrawerHeader height={height}>
          <Grid
            container
            alignItems="center"
            justify="flex-end"
          >
            <IconButton onClick={onClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Grid>
          <Grid
            container
            direction="column"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <a href="https://www.alterclass.io">
                <Logo
                  src="logo.png"
                  alt="logo"
                  width="80%"
                />
              </a>
            </Grid>
            <Grid item xs={12}>
              <StyledAvatar alt="Marion Cotillard" src="/avatar.jpg" />
              <Name variant="body1">Marion Cotillard</Name>
              <Position variant="body2">Software Engineer</Position>
            </Grid>
          </Grid>
        </DrawerHeader>
        <StyledDivider />
        {
          lists.map(list => (
            renderList(list.title, list.items)
          ))
        }
        <StyledDivider />
        <DrawerFooter>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ReactLogo src="react.svg" />}
            href="https://www.alterclass.io"
          >
            
            Learn ReactJS
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </StyledDrawer>
  );
};

export default PersistentDrawer;
