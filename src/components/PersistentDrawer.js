import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
// @material-ui/core components
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons components
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
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
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  height: ${props => props.height}px;
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
        },
        { icon: <LockOpenIcon />, text: "Authentication", link: 'authentication' }
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
          <IconButton onClick={onClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        {
          lists.map(list => (
            renderList(list.title, list.items)
          ))
        }
      </DrawerContent>
    </StyledDrawer>
  );
};

export default PersistentDrawer;
